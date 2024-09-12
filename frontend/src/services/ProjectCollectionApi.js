import * as HttpRequest from "./HttpRequest";
import * as e from "../Endpoints";

export const getProjectByCategory = async (body, page, signal) => {
  return await HttpRequest.post(
    e.CRUD_PROJECT_COLLECTION + `/get-by-category?page=${page}`,
    body,
    "token",
    signal
  );
};
