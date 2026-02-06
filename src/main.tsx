
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { CityProvider } from './context/CityContext.tsx'

createRoot(document.getElementById('root')!).render(

    <ThemeProvider>
      <CityProvider>

        <App />
      </CityProvider>
    </ThemeProvider>
  
)
