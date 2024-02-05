import React from "react"
import { createRoot } from "../which-react"
import App from "./App.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <div>
    <div>123</div>
    <div>456</div>
  </div>
)
