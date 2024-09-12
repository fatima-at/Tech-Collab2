import * as HttpRequest from './HttpRequest';
import * as e from "../Endpoints";

export const generateProjectWithoutCv = async (body, signal) => {
    return await HttpRequest.post(e.AI_API + "/generate_project_1", body, 'auth', signal);
};

export const generateProjectWithCv = async (body, signal) => {
    return await HttpRequest.post(e.AI_API + "/generate_project_2", body, 'auth', signal);
};

export const getRecommendedProjects = async (body, signal) => {
    return await HttpRequest.post(e.AI_API + "/recommend_project_1", body, 'auth', signal);
};