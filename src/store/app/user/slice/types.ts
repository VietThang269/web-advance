export interface User {
  id: number;
  username: string;
  password: string;
  token: string;
  role: number;
  status: number;
  createTime: number;
}

// export interface UserState {
//   user?: User;
//   error: number;
//   message: string;
//   isLoading: boolean;
// }

export interface UserState {
  id: number;
  username: string;
  password: string;
  token: string;
  role: number;
  status: number;
  createTime: number;
  error: number;
  message: string;
  isLoading: boolean;
}

export interface PayLoadUser {
  username: string;
  password: string;
}
