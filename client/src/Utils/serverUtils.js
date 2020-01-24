import httpUtils from "./httpUtils";

const getNewPassword = async () =>
httpUtils.Get("/api/new-password");

const verifyPassword = async (body) => {
  try {
    return await httpUtils.Post("/api/verify-password", body);
  } catch (error) {
    // console.error(error);
  }
};

export default {
    getNewPassword,
    verifyPassword
}