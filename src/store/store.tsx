import { enableStaticRendering } from "mobx-react-lite";
import { AuthenticationStore } from "./authentication";

enableStaticRendering(typeof window === "undefined");

export class Store {
  authentication: AuthenticationStore;

  constructor() {
    this.authentication = new AuthenticationStore(this);
    if (typeof window !== "undefined") {
      import(/* webpackChunkName: "TokenUtil" */ "@/src/utils/token").then((module) => {
        const TokenUtil = module.TokenUtil;
        TokenUtil.loadToken();
      });
    }
  }

  hydrate = (data: any) => {
    if (!data) {
      // handle empty data
    }
  };
}
