/**
 * Generate HMAC-SHA1 signature for Cloudinary upload/destroy requests.
 * Uses Web Crypto API which is native to browsers (no dependencies required).
 */
const generateSignature = async (params, apiSecret) => {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const signString = paramString + apiSecret;

  const utf8 = new TextEncoder().encode(signString);
  const hashBuffer = await crypto.subtle.digest("SHA-1", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const signature = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return signature;
};

/**
 * Upload a file to Cloudinary Storage using standard XMLHttpRequests to track progress
 * @param {File} file - File object to upload
 * @param {string} folder - Destination folder (e.g. 'gallery', 'enquiries')
 * @param {function} onProgress - Callback for tracking progress percentage
 * @returns {Promise<{url: string, path: string}>}
 */
export const uploadFile = (file, folder = "gallery", onProgress) => {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected"));
      return;
    }

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
      const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

      if (!cloudName || !apiKey || !apiSecret) {
        reject(new Error("Cloudinary credentials are not configured in environment variables."));
        return;
      }

      const timestamp = Math.round(Date.now() / 1000);
      const params = {
        folder,
        timestamp
      };

      const signature = await generateSignature(params, apiSecret);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", folder);
      formData.append("signature", signature);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);

      if (onProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            onProgress(percentComplete);
          }
        });
      }

      xhr.onload = () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              url: response.secure_url,
              path: response.public_id
            });
          } else {
            reject(new Error(response.error?.message || "Cloudinary upload failed"));
          }
        } catch (err) {
          reject(new Error("Failed to parse Cloudinary response."));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during Cloudinary upload."));
      };

      xhr.send(formData);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Delete a file from Cloudinary Storage
 * @param {string} fileRefOrUrl - Cloudinary public ID or secure URL
 */
export const deleteFile = async (fileRefOrUrl) => {
  if (!fileRefOrUrl) return;

  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn("Cloudinary credentials not configured. Skipping deletion.");
      return;
    }

    // Extract public_id if a full HTTP URL is passed
    let publicId = fileRefOrUrl;
    if (fileRefOrUrl.startsWith("http")) {
      const uploadIndex = fileRefOrUrl.indexOf("/upload/");
      if (uploadIndex !== -1) {
        const pathPart = fileRefOrUrl.substring(uploadIndex + 8);
        const nextSlashIndex = pathPart.indexOf("/");
        
        let idWithPath = pathPart;
        // Skip version string if present (e.g. /v1234567/)
        if (nextSlashIndex !== -1 && pathPart.startsWith("v")) {
          idWithPath = pathPart.substring(nextSlashIndex + 1);
        }
        
        // Remove file extension
        const dotIndex = idWithPath.lastIndexOf(".");
        if (dotIndex !== -1) {
          publicId = idWithPath.substring(0, dotIndex);
        } else {
          publicId = idWithPath;
        }
      }
    }

    const timestamp = Math.round(Date.now() / 1000);
    const params = {
      public_id: publicId,
      timestamp
    };

    const signature = await generateSignature(params, apiSecret);

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    if (result.result === "ok") {
      console.log(`Successfully deleted asset: ${publicId} from Cloudinary`);
    } else {
      console.warn(`Cloudinary asset deletion failed for ${publicId}:`, result.error?.message || result.result);
    }
  } catch (error) {
    console.error("Cloudinary deletion API error:", error);
  }
};
