export interface IUserInfo {
  name: string;
  login: string;
  password: string;
}

export interface IAuthInfo {
  login: string;
  password: string;
}

export interface IToken {
  token: string;
}

export interface IAuthStore {
  name: string;
  login: string;
  token: string;
}
