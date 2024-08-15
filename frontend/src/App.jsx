import { useEffect } from "react";
import "./App.css";
import { AUTH_ROUTE } from "./constants/routes";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import RootNavigation from "./navigation/RootNavigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const initialize = () => {
    if (token) {
      console.log("authorize");
    }
    // } else {
    //   navigate(AUTH_ROUTE);
    // }
  };

  useEffect(() => {
    initialize();
  }, []);
  return (
    <div className="main-screen">
      <RootNavigation />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default App;
