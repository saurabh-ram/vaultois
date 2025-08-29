import React, { createContext, useContext } from "react";

const HeightContext = createContext();

export const useHeight = () => {
  return useContext(HeightContext);
};

export default HeightContext;
