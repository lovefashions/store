
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserPreferencesContext = createContext();

export const useUserPreferences = () => useContext(UserPreferencesContext);

const getInitialPreferences = () => {
  try {
    const item = window.localStorage.getItem('userPreferences');
    return item ? JSON.parse(item) : { favoriteColors: [], preferredStyles: [], previousDesigns: [] };
  } catch (error) {
    console.warn('Error reading localStorage userPreferences:', error);
    return { favoriteColors: [], preferredStyles: [], previousDesigns: [] };
  }
};

export const UserPreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(getInitialPreferences);

  useEffect(() => {
    try {
      window.localStorage.setItem('userPreferences', JSON.stringify(preferences));
    } catch (error) {
      console.warn('Error setting localStorage userPreferences:', error);
    }
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };
  
  const addPreviousDesign = (design) => {
    setPreferences(prev => ({
      ...prev,
      previousDesigns: [design, ...prev.previousDesigns.slice(0, 4)] 
    }));
  };

  const clearPreferences = () => {
    setPreferences({ favoriteColors: [], preferredStyles: [], previousDesigns: [] });
     try {
      window.localStorage.removeItem('userPreferences');
    } catch (error) {
      console.warn('Error clearing localStorage userPreferences:', error);
    }
  };

  const value = {
    preferences,
    updatePreference,
    addPreviousDesign,
    clearPreferences,
  };

  return (
    <UserPreferencesContext.Provider value={value}>
      {children}
    </UserPreferencesContext.Provider>
  );
};