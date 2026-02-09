import { Toaster } from "react-hot-toast"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { CityProvider } from './context/CityContext.tsx'

createRoot(document.getElementById('root')!).render(

    <ThemeProvider>
      <CityProvider>
        <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      /> 
        <App />
        
      </CityProvider>
    </ThemeProvider>
  
)
