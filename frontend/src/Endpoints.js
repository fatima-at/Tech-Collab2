import { TOKEN_KEY } from "./context/AuthContext";

export const CRUD_API = `${import.meta.env.VITE_API_URL}/api/v1`

export const SIGN_UP = `${import.meta.env.VITE_API_URL}/api/auth/register`;
export const LOG_IN = `${import.meta.env.VITE_API_URL}/api/auth/login`;
export const VERIFY_EMAIL = `${import.meta.env.VITE_API_URL}/api/auth/verify`;
export const REFRESH_TOKEN = `${import.meta.env.VITE_API_URL}/api/auth/refresh`;
export const LOG_OUT = `${import.meta.env.VITE_API_URL}/api/auth/logout`;

export const CRUD_PROJECT_SESSIONS = `${import.meta.env.VITE_API_URL}/api/v1/project-sessions`;
export const CRUD_PROJECTS = `${import.meta.env.VITE_API_URL}/api/v1/projects`;

export const HeadersWithToken = (overrideToken) => {
    let token = overrideToken || localStorage.getItem(TOKEN_KEY);
    return {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    };
  };
  
  export const HeadersWithoutToken = () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  };
  