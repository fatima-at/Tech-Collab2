import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthContextProvider } from "./context";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { primaryColor } from "./constants/colors.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const theme = extendTheme({
  colors: {
    primary: {
      500: primaryColor,
    },
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "Roboto",
      },
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
