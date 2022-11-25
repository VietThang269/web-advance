export interface User {
  id: number;
  username: string;
  token: string;
  role: number;
  status: number;
  // createTime:
}

export interface UserState {
  user?: User;
  error: number;
  message: string;
  isLoading: boolean;
}

export interface PayLoadUser {
  username: string;
  password: string;
}
