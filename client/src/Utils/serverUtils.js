import httpUtils from "./httpUtils";

const pingServer = async () =>
  httpUtils.Get("/api/test");

const getNewPassword = async () =>
httpUtils.Get("/api/new-password");

const sendPostApiWorld = async (body) => {
  try {
    return await httpUtils.Post("/api/world", body);
  } catch (error) {
    // console.error(error);
  }
};


export default {
    pingServer,
    sendPostApiWorld,
    getNewPassword,
}