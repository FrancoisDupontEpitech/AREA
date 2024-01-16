// AreaContext.js
import React, { createContext, useContext, useState } from 'react';

const AreaContext = createContext();

export const useAreas = () => {
  return useContext(AreaContext);
};

export const AreaProvider = ({ children }) => {
  const [areas, setAreas] = useState([]);

  const toggleAreaEnabled = (id) => {
    setAreas(areas => areas.map(area => {
      if (area.id === id) {
        return { ...area, isEnabled: !area.isEnabled };
      }
      return area;
    }));
  };

  const addArea = (newArea) => {
    // Simulating an ID for the example. In a real application, IDs should be assigned by the backend.
    const simulatedNewArea = { ...newArea, id: Math.random().toString(36).substr(2, 9) };
    setAreas(prevAreas => [...prevAreas, simulatedNewArea]);
  };

  const deleteArea = (id) => {
    setAreas(prevAreas => prevAreas.filter(area => area.id !== id));
  };

  return (
    <AreaContext.Provider value={{ areas, toggleAreaEnabled, addArea, deleteArea }}>
      {children}
    </AreaContext.Provider>
  );
};
