import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { primaryColor } from "./constants/colors.js";

const theme = extendTheme({
  colors: {
    primary: {
      500: primaryColor,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ChakraProvider>
  </Router>
);
