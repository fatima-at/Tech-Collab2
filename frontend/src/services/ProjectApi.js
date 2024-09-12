import * as HttpRequest from "./HttpRequest";
import * as e from "../Endpoints";

export const createProject = async (body, sessionId, signal) => {
  return await HttpRequest.post(
    e.CRUD_PROJECT_SESSIONS + "/" + sessionId + "/projects",
    body,
    "token",
    signal
  );
};

export const createStandAloneProject = async (body, signal) => {
  return await HttpRequest.post(e.CRUD_PROJECTS, body, "token", signal);
};

export const toggleBookmarkProject = async (projectId, signal) => {
  return await HttpRequest.post(
    e.CRUD_PROJECTS + "/" + projectId + "/bookmark",
    null,
    "token",
    signal
  );
};

export const getBookmarkedProjects = async (signal) => {
  return await HttpRequest.get(
    e.CRUD_PROJECTS + "/bookmarked",
    null,
    "token",
    signal
  );
};

export const getRecommendedProjects = async (signal) => {
  return await HttpRequest.get(
    e.CRUD_PROJECTS + "/standalone",
    null,
    "token",
    signal
  );
};
