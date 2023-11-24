import { http } from "../utils/http";
import useSWR from "swr";

const url = {
  total: () => `/api/user/total-user`,
  all: () => `/api/user`,
  create: () => "/api/user/create",
  update: (id: string) => `/api/user/${id}`,
};

const hooks = {
  useGetTotal: () => {
    return useSWR(url.total(), http.fetcher);
  },
  useGetUsers: () => {
    return useSWR(url.all(), http.fetcher);
  },
};

const api = {
  createUser(data: any) {
    return http.post(url.create()).send(data);
  },
  updateUser(data: any, id: string) {
    return http.put(url.update(id)).send(data);
  },
};

export const userRepository = {
  url,
  hooks,
  api,
};
