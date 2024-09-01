import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const createProjectSession = async (body, signal) => {
    return await HttpRequest.post(e.CRUD_PROJECT_SESSIONS, body, 'token', signal);
};

export const getProjectSessions = async (signal) => {
    return await HttpRequest.get(e.CRUD_PROJECT_SESSIONS, null, 'token', signal);
};

export const getProjectSessionData = async (sessionId, signal) => {
    return await HttpRequest.get(e.CRUD_PROJECT_SESSIONS + "/" + sessionId, null, 'token', signal);
};