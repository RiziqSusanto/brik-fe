import { makeAutoObservable, runInAction } from "mobx";
import { authenticationRepository } from "../repository/authentication";
import { TokenUtil } from "../utils/token";
import { Store } from "./store";

export class AuthenticationStore {
  store: Store;
  isLoggedIn = false;
  isLoginLoading = false;
  ctx;
  token = "";

  constructor(ctx: Store) {
    makeAutoObservable(this, {store: false});
    this.ctx = ctx;
  }

  async login({ email, password }) {
    runInAction(() => {
      this.isLoginLoading = true;
    });
    try {
      const result = await authenticationRepository.api.login({
        email,
        password,
      });

      TokenUtil.setAccessToken(result.body.token);
      TokenUtil.persistToken();
      this.setToken(result.body.token);
      this.setIsLogin(true);
      runInAction(() => {
        this.isLoginLoading = false;
        this.isLoggedIn = true;
      });
      // return result;
    } catch (e) {
      runInAction(() => {
        this.isLoginLoading = false;
      });
      throw e;
    }
  }

  setIsLogin(val: boolean) {
    this.isLoggedIn = val;
  }

  setToken(token: string) {
    this.token = token;
  }

  logout() {
    TokenUtil.clearAccessToken();
    TokenUtil.persistToken();
    this.isLoggedIn = false;
  }
}
