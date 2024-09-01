import React from "react";
import "./styles.css";
import LogoHeader from "../../UI/LogoHeader";
import {
  faBookmark,
  faHistory,
  faHouse,
  faProjectDiagram,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "../../UI/Text";
import { logo } from "../../../assets";
import {
  GENERATE_PROJECTS_ROUTE,
  HOME_ROUTE,
  PROFILE_ROUTE,
  SAVED_PROJECTS_ROUTE,
  SESSIONS_HISTORY_ROUTE,
} from "../../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { primaryColor } from "../../../constants/colors";
import Popup from "../../Custom/Popup";
import { useModal } from "../../../hooks";
import { logout } from "../../../services/AuthApi";
import { toast } from "react-toastify";
import { useAuth } from "../../../context";
import { TOKEN_KEY } from "../../../context/AuthContext";
import { AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkAuthentication } = useAuth();
  const { openModal, closeModal, isModalOpened } = useModal();
  const sidebarButtons = [
    { name: "Home", logo: faHouse, route: HOME_ROUTE },
    {
      name: "Generate Projects",
      logo: faProjectDiagram,
      route: GENERATE_PROJECTS_ROUTE,
    },
    {
      name: "Sessions History",
      logo: faHistory,
      route: SESSIONS_HISTORY_ROUTE,
    },
    {
      name: "Saved Projects",
      logo: faBookmark,
      route: SAVED_PROJECTS_ROUTE,
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status) {
        localStorage.setItem(TOKEN_KEY, "");
        await checkAuthentication();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="sidebar">
      <AnimatePresence>
        {isModalOpened && (
          <Popup
            onClose={closeModal}
            title="Logout"
            description="Are you sure you want to logout of your account?"
            primaryButtonText="Logout"
            handleSubmit={handleLogout}
          />
        )}
      </AnimatePresence>
      <div className="sidebar-header">
        <img src={logo} alt="" />
        <Text type="h6" color="white">
          Tech-Collab
        </Text>
      </div>
      <div className="sidebar-body">
        {sidebarButtons.map((button) => (
          <button
            className="sidebar-button"
            style={
              location.pathname.includes(button.route)
                ? {
                    backgroundColor: primaryColor,
                  }
                : {}
            }
            onClick={() => {
              navigate(`/${button.route}`);
            }}
            key={button.name}
          >
            <FontAwesomeIcon icon={button.logo} color="white" />
            <Text type="p" color="white">
              {button.name}
            </Text>
          </button>
        ))}
      </div>
      <div className="sidebar-footer">
        <button
          className="sidebar-button"
          style={
            location.pathname.includes(PROFILE_ROUTE)
              ? {
                  backgroundColor: primaryColor,
                }
              : {}
          }
          onClick={() => navigate(`/${PROFILE_ROUTE}`)}
        >
          <FontAwesomeIcon icon={faUser} color="white" />
          <Text type="p" color="white">
            Your Profile
          </Text>
        </button>
        <button className="sidebar-button" onClick={openModal}>
          <FontAwesomeIcon icon={faSignOut} color="white" />
          <Text type="p" color="white">
            Logout
          </Text>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
