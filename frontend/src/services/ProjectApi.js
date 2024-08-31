import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const createProject = async (body, sessionId, signal) => {
    return await HttpRequest.post(e.CRUD_PROJECT_SESSIONS + "/" + sessionId + "/projects", body, 'token', signal);
};