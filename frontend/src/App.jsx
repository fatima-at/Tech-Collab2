import { useEffect } from "react";
import "./App.css";
import { AUTH_ROUTE } from "./constants/routes";
import { useAuth } from "./context";
import { useNavigate } from "react-router-dom";
import RootNavigation from "./navigation/RootNavigation";

const App = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const initialize = () => {
    if (token) {
      console.log("authorize");
    } else {
      navigate(AUTH_ROUTE);
    }
  };

  useEffect(() => {
    initialize();
  }, []);
  return (
    <div style={{ width: "100%", height: "100vh", overflow:"visible", display: "flex" }}>
      <RootNavigation />
    </div>
  );
};

export default App;
