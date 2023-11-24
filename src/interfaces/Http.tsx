import {Request, Response} from "superagent";

type Fetcher = (url: string) => Promise<Response>;

export interface Http {
    fetcher: Fetcher;
    get: (url: string, opts?: object) => Promise<Response>;
    post: (url: string, opts?: object) => Request;
    put: (url: string, opts?: object) => Request;
    del: (url: string, opts?: object) => Request;
}
