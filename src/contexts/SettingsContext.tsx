
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface NotificationSettings {
  mealReminders: boolean;
  activityAlerts: boolean;
  shoppingUpdates: boolean;
  weeklyDigest: boolean;
}

interface FamilySettings {
  familyName: string;
  timezone: string;
  currency: string;
}

interface SettingsContextType {
  notifications: NotificationSettings;
  familySettings: FamilySettings;
  updateNotifications: (notifications: NotificationSettings) => void;
  updateFamilySettings: (settings: FamilySettings) => void;
  saveSettings: () => Promise<void>;
}

const defaultNotifications: NotificationSettings = {
  mealReminders: true,
  activityAlerts: true,
  shoppingUpdates: false,
  weeklyDigest: true
};

const defaultFamilySettings: FamilySettings = {
  familyName: "Johnson Family",
  timezone: "America/New_York",
  currency: "USD"
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(defaultNotifications);
  const [familySettings, setFamilySettings] = useState<FamilySettings>(defaultFamilySettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('familyHub_notifications');
    const savedFamilySettings = localStorage.getItem('familyHub_familySettings');

    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    }

    if (savedFamilySettings) {
      try {
        setFamilySettings(JSON.parse(savedFamilySettings));
      } catch (error) {
        console.error('Error loading family settings:', error);
      }
    }
  }, []);

  const updateNotifications = (newNotifications: NotificationSettings) => {
    setNotifications(newNotifications);
  };

  const updateFamilySettings = (newSettings: FamilySettings) => {
    setFamilySettings(newSettings);
  };

  const saveSettings = async (): Promise<void> => {
    try {
      localStorage.setItem('familyHub_notifications', JSON.stringify(notifications));
      localStorage.setItem('familyHub_familySettings', JSON.stringify(familySettings));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('Settings saved successfully:', { notifications, familySettings });
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{
      notifications,
      familySettings,
      updateNotifications,
      updateFamilySettings,
      saveSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
