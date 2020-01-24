import httpUtils from "./httpUtils";

const getNewPassword = async () => {
  try {
    return await httpUtils.Get("/api/new-password");
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

const verifyPassword = async body => {
  try {
    return await httpUtils.Post("/api/verify-password", body);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

export default {
  getNewPassword,
  verifyPassword
};
