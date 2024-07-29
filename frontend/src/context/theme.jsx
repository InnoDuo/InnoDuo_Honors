import { React, createContext, useContext } from "react";

export const ThemeContext = createContext({
    defaultTheme: "light",
    darkTheme: ()=>{},
    lightTheme: ()=> {},
  });

export const ThemeProvider = ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}