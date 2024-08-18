import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const signUp = async (body, signal) => {
    return await HttpRequest.post(e.SIGN_UP, body, 'auth', signal);
};

export const login = async (body, signal) => {
    return await HttpRequest.post(e.LOG_IN, body, 'auth', signal);
};

export const verifyEmail = async (body, signal) => {
    return await HttpRequest.post(e.VERIFY_EMAIL, body, 'auth', signal);
};

export const refresh = async (body, signal) => {
    return await HttpRequest.post(e.REFRESH_TOKEN, body, 'token', signal);
};

export const logout = async (signal) => {
    return await HttpRequest.post(e.LOG_OUT, null, 'token', signal);
};