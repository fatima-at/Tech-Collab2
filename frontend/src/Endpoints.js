import { TOKEN_KEY } from "./context/AuthContext";

export const CRUD_API = `${import.meta.env.VITE_API_URL}/api/v1`;

export const SIGN_UP = `${import.meta.env.VITE_API_URL}/api/auth/register`;
export const LOG_IN = `${import.meta.env.VITE_API_URL}/api/auth/login`;
export const VERIFY_EMAIL = `${import.meta.env.VITE_API_URL}/api/auth/verify`;
export const REFRESH_TOKEN = `${import.meta.env.VITE_API_URL}/api/auth/refresh`;
export const LOG_OUT = `${import.meta.env.VITE_API_URL}/api/auth/logout`;

export const CRUD_PROJECT_SESSIONS = `${
  import.meta.env.VITE_API_URL
}/api/v1/project-sessions`;
export const CRUD_PROJECTS = `${import.meta.env.VITE_API_URL}/api/v1/projects`;

export const CRUD_USER = `${import.meta.env.VITE_API_URL}/api/v1/user`;
export const CRUD_USERS = `${import.meta.env.VITE_API_URL}/api/v1/users`;

export const CRUD_PROJECT_COLLECTION = `${
  import.meta.env.VITE_API_URL
}/api/v1/projects/collection`;

export const AI_API = `${import.meta.env.VITE_AI_API_URL}`;

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
