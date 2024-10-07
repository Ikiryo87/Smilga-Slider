import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// React.StrictMode was giving issues with the useEffect and setInterval functionality hence I removed it.
