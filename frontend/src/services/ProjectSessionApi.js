import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const createSession = async (body, signal) => {
    return await HttpRequest.post(e.CRUD_PROJECT_SESSIONS, body, 'token', signal);
};