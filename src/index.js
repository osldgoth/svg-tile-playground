import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SVGContextProvider } from "./components/SVGContext"
//import "bootstrap@5.3.3/dist/css/bootstrap.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SVGContextProvider>
      <App />
    </SVGContextProvider>
  </React.StrictMode>
);
