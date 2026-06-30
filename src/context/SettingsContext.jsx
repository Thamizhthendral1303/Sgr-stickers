import React, { createContext, useContext, useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "../services/firestore";

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    shopName: "SGR Stickers",
    phoneNumber: "",
    whatsAppNumber: "",
    address: "",
    workingHours: "",
    socialLinks: {
      facebook: "",
      instagram: "",
      youtube: ""
    },
    heroBanner: []
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getSiteSettings();
      setSettings(data);
    } catch (error) {
      console.error("Error loading settings in context:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    try {
      await updateSiteSettings(newSettings);
      setSettings((prev) => ({
        ...prev,
        ...newSettings
      }));
    } catch (error) {
      console.error("Error updating settings in context:", error);
      throw error;
    }
  };

  const value = {
    settings,
    loading,
    refreshSettings: fetchSettings,
    updateSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
