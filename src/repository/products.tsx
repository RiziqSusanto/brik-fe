import { http } from "../utils/http";
import useSWR from "swr";

const url = {
  get: (page: number, search?:string) => `/products?page=${page}&search=${search}`,
  detail: (id: string | undefined) => `/products/${id}`,
  create: () => "/products",
  update: (id: string) => `/products/${id}`,
  delete: () => `/products/delete`,
};

const hooks = {
  useGetProduct: (page: number, search?:string) => {
    return useSWR(url.get(page, search), http.fetcher);
  },
  useGetDetail: (id: string) => {
    return useSWR(url.detail(id), http.fetcher);
  },
};

const api = {
  createProduct(data: any) {
    return http.post(url.create()).send(data);
  },
  updateProduct(data: any, id: string) {
    return http.put(url.update(id)).send(data);
  },
  deleteProduct(data) {
    return http.post(url.delete()).send(data);
  },
};

export const productRepository = {
  url,
  hooks,
  api,
};
