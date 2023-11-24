import { http } from "../utils/http";
import useSWR from "swr";

const url = {
    get: () => `/category`,
    create: () => "category",
    update: (id: string) => `/category/${id}`,
    delete: () => `/category/delete`,
};

const hooks = {
    useGetData: () => {
        return useSWR(url.get(), http.fetcher);
    },
};

const api = {
    createCategory(data: any) {
        return http.post(url.create()).send(data);
    },
    updateCategory(data: any, id: string) {
        return http.put(url.update(id)).send(data);
    },
    deleteCategory(id: string) {
        return http.post(url.delete()).send(id)
    }
};

export const categoryRepository = {
    url,
    hooks,
    api,
};
