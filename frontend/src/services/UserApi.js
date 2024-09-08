import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const getUserBase64Cv = async (signal) => {
    return await HttpRequest.get(e.CRUD_USER + "/cv-base64", null, 'token', signal);
};