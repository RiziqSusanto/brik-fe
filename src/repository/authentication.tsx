import { http } from "../utils/http";

const url = {
  login: () => "/authentication/login",
  register: () => "/authentication/register",
};

const api = {
  login({ email, password }) {
    return http.post(url.login()).send({
      email,
      password,
    });
  },
  register({ email, password, name }) {
    return http.post(url.register()).send({
      email,
      password,
      name
    });
  },
};

export const authenticationRepository = {
  url,
  api,
};
