import { createContext, useContext,type ReactNode } from "react";
import type {  themeContextType } from "../types/themeContextType";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const themeContext=createContext<themeContextType|null>(null);

export const ThemeProvider =({children}:{children:ReactNode})=>{
    // const [theme,setTheme]=useState<string>("dark")
    const [theme,setTheme]=useLocalStorage<string>("theme","dark")
   
    const toggleTheme=()=>{
        if(theme==="dark"){
            setTheme("light")
        }else{
             setTheme("dark")
        }
        // setTheme((prev)=>{
        //     return (prev==="light"?"dark":"light")
        // })
    }
    return(
        <themeContext.Provider value={{theme,toggleTheme,}}>
         {children}
        </themeContext.Provider>
    )

}
export const useTheme = () => {
  const context = useContext(themeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}