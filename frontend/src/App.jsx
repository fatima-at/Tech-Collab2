import React, { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context";
import RootNavigation from "./navigation/RootNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components";
import MainNavigation from "./navigation/MainNavigation";
import { Box, useColorModeValue } from "@chakra-ui/react";

const App = () => {
  const bgGradient = useColorModeValue(
    "linear(to-br, gray.50, gray.100)",
    "linear(to-br, gray.700, gray.900)"
  );
  const { checkAuthentication, isAuthenticated, isPageReadyToRender } =
    useAuth();
  const initialize = async () => {
    await checkAuthentication();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      overflow="visible"
      bgGradient={bgGradient}
    >
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
      {isPageReadyToRender ? (
        isAuthenticated ? (
          <MainNavigation />
        ) : (
          <RootNavigation />
        )
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default App;
