const atob = require("atob");

export class TokenUtil {
  static accessToken?: string;

  static loadToken(): void {
    if (typeof window === "undefined") {
      return;
    }

    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      TokenUtil.setAccessToken(accessToken);
    }
  }

  static persistToken(): void {
    if (TokenUtil.accessToken != null) {
      localStorage.setItem("access_token", TokenUtil.accessToken);
    } else {
      localStorage.removeItem("access_token");
    }
  }

  static setAccessToken(accessToken: string): void {
    TokenUtil.accessToken = accessToken;
  }

  static clearAccessToken(): void {
    TokenUtil.accessToken = undefined;
  }

  static decodedToken(): any {
    if (TokenUtil.accessToken) {
      return JSON.parse(atob(TokenUtil.accessToken.split(".")[1]));
    }
  }
}

export const initLocalStorage = (): Storage => {
  if (typeof window === "undefined") {
    return {
      getItem: () => {},
    } as unknown as Storage;
  } else {
    return window.localStorage;
  }
};
