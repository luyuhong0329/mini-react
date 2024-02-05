import React from "react"
import { createRoot } from "../which-react"
import App from "./App.jsx"
import "./index.css"

const jsx = (
  <div>
    <div>123</div>
    <div>456</div>
  </div>
)

createRoot(document.getElementById("root")).render(jsx)
