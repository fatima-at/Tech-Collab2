import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const getUserBase64Cv = async (signal) => {
    return await HttpRequest.get(e.CRUD_USER + "/cv-base64", null, 'token', signal);
};

export const searchUsers = async (query, signal) => {
    return await HttpRequest.get(e.CRUD_USERS + `/search?search=${query}`, null, 'token', signal);
};