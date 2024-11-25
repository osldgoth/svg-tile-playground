//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SVGContextProvider } from "./components/SVGContext.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')).render(
    //<React.StrictMode>
    <SVGContextProvider>
      <App />
    </SVGContextProvider>
  //</React.StrictMode>
)
