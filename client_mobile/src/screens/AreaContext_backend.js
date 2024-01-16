// AreaContext.js
import React, { createContext, useContext, useState } from 'react';

const AreaContext = createContext();

export const useAreas = () => {
  return useContext(AreaContext);
};

export const AreaProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);

  const toggleAreaEnabled = async (id) => {
    const areaToUpdate = areas.find(area => area.id === id);
    if (areaToUpdate) {
      const newEnabledState = !areaToUpdate.isEnabled;
      try {
        // Update the backend first
        await updateAreaOnBackend(id, { isEnabled: newEnabledState });
  
        // If the backend update is successful, then update the state
        setAreas(areas.map(area => {
          if (area.id === id) {
            return { ...area, isEnabled: newEnabledState };
          }
          return area;
        }));
      } catch (error) {
        // Handle error (e.g., failed API call)
        console.error("Failed to toggle area enabled state:", error);
      }
    }
  };

  const addArea = async (newArea) => {
    try {
      // API call to add the area to the backend
      const addedArea = await addAreaToBackend(newArea);
      setAreas(prevAreas => [...prevAreas, addedArea]);
    } catch (error) {
      // Handle error (e.g., failed API call)
      console.error("Failed to add area:", error);
    }
  };

  const deleteArea = async (id) => {
    // API call to delete the area from the backend
    await deleteAreaFromBackend(id);
    setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
  };

  return (
    <AreaContext.Provider value={{ areas, toggleAreaEnabled, addArea, deleteArea }}>
      {children}
    </AreaContext.Provider>
  );
};

// Mock function for adding an area to the backend
async function addAreaToBackend(newArea) {
  try {
    // Replace this URL with the endpoint of your API that handles adding a new area
    const response = await fetch('https://your-api-url.com/areas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // If you require an authorization token, include it in the headers
        // 'Authorization': 'Bearer ' + YOUR_TOKEN_HERE,
      },
      body: JSON.stringify(newArea),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const addedArea = await response.json();
    return addedArea;
  } catch (error) {
    console.error("Could not add area to backend:", error);
    throw error; // Rethrow the error so you can handle it in the addArea function
  }
}


// Replace `updateAreaOnBackend`, `addAreaToBackend`, and `deleteAreaFromBackend`
// with your actual API call functions.
