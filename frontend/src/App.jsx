import React, { useEffect } from "react";
import "./App.css";
import { useAuth } from "./context";
import RootNavigation from "./navigation/RootNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "./components";
import MainNavigation from "./navigation/MainNavigation";

const App = () => {
  const { checkAuthentication, isAuthenticated, isPageReadyToRender } =
    useAuth();
  const initialize = async () => {
    await checkAuthentication();
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="main-screen">
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
    </div>
  );
};

export default App;
