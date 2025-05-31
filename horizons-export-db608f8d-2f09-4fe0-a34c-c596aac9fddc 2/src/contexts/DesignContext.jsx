import React, { createContext, useContext, useState, useCallback } from 'react';

const DesignContext = createContext();

export const useDesign = () => useContext(DesignContext);

const getInitialDesigns = () => {
  try {
    const item = window.localStorage.getItem('userDesigns');
    return item ? JSON.parse(item) : {};
  } catch (error) {
    console.warn('Error reading localStorage userDesigns:', error);
    return {};
  }
};

export const DesignProvider = ({ children }) => {
  const [allDesigns, setAllDesigns] = useState(getInitialDesigns);
  const [currentDesign, setCurrentDesign] = useState({ productId: null, elements: [] });
  const [lastFinalizedDesign, setLastFinalizedDesign] = useState(null);


  const saveDesignsToLocalStorage = (designs) => {
    try {
      window.localStorage.setItem('userDesigns', JSON.stringify(designs));
    } catch (error) {
      console.warn('Error setting localStorage userDesigns:', error);
    }
  };
  
  const loadDesign = useCallback((productId) => {
    const loadedDesign = allDesigns[productId] || { productId, elements: [] };
    setCurrentDesign(loadedDesign);
  }, [allDesigns]);

  const saveCurrentDesign = useCallback((productIdToSave) => {
    if (productIdToSave && currentDesign.productId === productIdToSave) {
      const updatedDesigns = { ...allDesigns, [productIdToSave]: currentDesign };
      setAllDesigns(updatedDesigns);
      saveDesignsToLocalStorage(updatedDesigns);
      if (currentDesign.elements.length > 0) { // Only set as finalized if there's something
        setLastFinalizedDesign(currentDesign);
      }
    }
  }, [currentDesign, allDesigns]);

  const addDesignElement = (element) => {
    setCurrentDesign(prev => ({
      ...prev,
      elements: [...prev.elements, element]
    }));
  };

  const updateDesignElement = (elementId, props) => {
    setCurrentDesign(prev => ({
      ...prev,
      elements: prev.elements.map(el => el.id === elementId ? { ...el, ...props } : el)
    }));
  };

  const removeDesignElement = (elementId) => {
    setCurrentDesign(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
  };

  const clearDesign = (productIdToClear) => {
    const clearedDesignForProduct = { productId: productIdToClear, elements: [] };
    setCurrentDesign(clearedDesignForProduct); // Update current view
    const updatedDesigns = { ...allDesigns, [productIdToClear]: clearedDesignForProduct }; // Update stored designs
    setAllDesigns(updatedDesigns);
    saveDesignsToLocalStorage(updatedDesigns);
  };


  const value = {
    currentDesign,
    lastFinalizedDesign,
    loadDesign,
    saveCurrentDesign,
    addDesignElement,
    updateDesignElement,
    removeDesignElement,
    clearDesign,
    setCurrentDesign // expose for direct manipulation if needed, e.g., loading template
  };

  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
};