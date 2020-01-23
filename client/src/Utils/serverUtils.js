import httpUtils from "./httpUtils";

const pingServer = async () =>
  httpUtils.Get("/api/test");

const getNewPassword = async () =>
httpUtils.Get("/api/new-password");

const verifyPassword = async (body) => {
  console.log(body)
  try {
    return await httpUtils.Post("/api/verify-password", body);
  } catch (error) {
    // console.error(error);
  }
};

export default {
    pingServer,
    getNewPassword,
    verifyPassword
}