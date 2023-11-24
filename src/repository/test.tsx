import { http } from "../utils/http";
import useSWR from "swr";

const url = {
    url: () => `/cards`,
};

const hooks = {
    useGet: () => {
        return useSWR(url.url(), http.fetcher);
    },
};

export const testRepository = {
    url,
    hooks,
};