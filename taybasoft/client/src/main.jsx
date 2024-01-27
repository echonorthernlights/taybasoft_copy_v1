import "react-toastify/dist/ReactToastify.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App.jsx"
import "./index.css"
import store from "./store.js"
import { ToastContainer } from "react-toastify"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <App />
    </Provider>
  </React.StrictMode>
)
