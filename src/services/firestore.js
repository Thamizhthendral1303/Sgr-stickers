import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";
import { deleteFile } from "./storage";

// ==========================================
// 1. GALLERY SERVICES
// ==========================================

export const getGalleryItems = async (category = "All") => {
  try {
    const galleryRef = collection(db, "gallery");
    let q;
    if (category === "All") {
      q = query(galleryRef, orderBy("createdDate", "desc"));
    } else {
      q = query(
        galleryRef,
        where("category", "==", category),
        orderBy("createdDate", "desc")
      );
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdDate: doc.data().createdDate?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    throw error;
  }
};

export const addGalleryItem = async (itemData) => {
  try {
    const galleryRef = collection(db, "gallery");
    const docRef = await addDoc(galleryRef, {
      ...itemData,
      createdDate: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding gallery item:", error);
    throw error;
  }
};

export const updateGalleryItem = async (id, itemData) => {
  try {
    const docRef = doc(db, "gallery", id);
    await updateDoc(docRef, itemData);
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
};

export const deleteGalleryItem = async (id, imagePath) => {
  try {
    // 1. Delete image from Firebase Storage if path is provided
    if (imagePath) {
      await deleteFile(imagePath);
    }
    // 2. Delete document from Firestore
    const docRef = doc(db, "gallery", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
};

// ==========================================
// 2. SERVICES (BUSINESS)
// ==========================================

export const getServicesList = async () => {
  try {
    const servicesRef = collection(db, "services");
    const q = query(servicesRef, orderBy("createdDate", "asc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching services list:", error);
    throw error;
  }
};

export const addService = async (serviceData) => {
  try {
    const servicesRef = collection(db, "services");
    const docRef = await addDoc(servicesRef, {
      ...serviceData,
      createdDate: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding service:", error);
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const docRef = doc(db, "services", id);
    await updateDoc(docRef, serviceData);
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (id) => {
  try {
    const docRef = doc(db, "services", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// ==========================================
// 3. ENQUIRIES (QUOTES)
// ==========================================

export const getEnquiries = async () => {
  try {
    const enquiriesRef = collection(db, "enquiries");
    const q = query(enquiriesRef, orderBy("createdDate", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdDate: doc.data().createdDate?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    throw error;
  }
};

export const addEnquiry = async (enquiryData) => {
  try {
    const enquiriesRef = collection(db, "enquiries");
    const docRef = await addDoc(enquiriesRef, {
      ...enquiryData,
      status: "pending",
      createdDate: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding enquiry:", error);
    throw error;
  }
};

export const markEnquiryAsContacted = async (id) => {
  try {
    const docRef = doc(db, "enquiries", id);
    await updateDoc(docRef, { status: "contacted" });
  } catch (error) {
    console.error("Error marking enquiry as contacted:", error);
    throw error;
  }
};

export const deleteEnquiry = async (id, imagePath) => {
  try {
    if (imagePath) {
      await deleteFile(imagePath);
    }
    const docRef = doc(db, "enquiries", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    throw error;
  }
};

// ==========================================
// 4. REVIEWS
// ==========================================

export const getReviewsList = async (onlyApproved = true) => {
  try {
    const reviewsRef = collection(db, "reviews");
    let q;
    if (onlyApproved) {
      q = query(
        reviewsRef,
        where("approved", "==", true),
        orderBy("createdDate", "desc")
      );
    } else {
      q = query(reviewsRef, orderBy("createdDate", "desc"));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdDate: doc.data().createdDate?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

export const addReview = async (reviewData) => {
  try {
    const reviewsRef = collection(db, "reviews");
    const docRef = await addDoc(reviewsRef, {
      ...reviewData,
      createdDate: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const approveReview = async (id) => {
  try {
    const docRef = doc(db, "reviews", id);
    await updateDoc(docRef, { approved: true });
  } catch (error) {
    console.error("Error approving review:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const docRef = doc(db, "reviews", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};

// ==========================================
// 5. SITE SETTINGS
// ==========================================

const DEFAULT_SETTINGS = {
  shopName: "SGR Stickers",
  phoneNumber: "+91 98765 43210",
  whatsAppNumber: "+91 98765 43210",
  address: "SGR Stickers, Main Road, Near City Center, Bangalore, Karnataka - 560001",
  workingHours: "Monday - Saturday: 9:00 AM - 8:00 PM, Sunday: Closed",
  socialLinks: {
    facebook: "https://facebook.com/sgrstickers",
    instagram: "https://instagram.com/sgrstickers",
    youtube: "https://youtube.com/sgrstickers"
  },
  heroBanner: [
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1920"
  ]
};

export const getSiteSettings = async () => {
  try {
    const docRef = doc(db, "settings", "shopInfo");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // If it doesn't exist, create it with default values
      await setDoc(docRef, DEFAULT_SETTINGS);
      return { id: "shopInfo", ...DEFAULT_SETTINGS };
    }
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return { id: "shopInfo", ...DEFAULT_SETTINGS }; // Fallback to default
  }
};

export const updateSiteSettings = async (settingsData) => {
  try {
    const docRef = doc(db, "settings", "shopInfo");
    await updateDoc(docRef, settingsData);
  } catch (error) {
    console.error("Error updating site settings:", error);
    throw error;
  }
};
