import * as HttpRequest from "./HttpRequest";
import * as e from "../Endpoints";

export const addUserToVectorDB = async (body, signal) => {
  return await HttpRequest.post(
    e.AI_API + "/add_Student_To_DB",
    body,
    "auth",
    signal
  );
};

export const getMatchingUsers = async (userVectorId, signal) => {
  return await HttpRequest.post(
    e.AI_API + `/Match_S2S?student_ID=${userVectorId}`,
    null,
    "auth",
    signal
  );
};
