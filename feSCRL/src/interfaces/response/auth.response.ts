export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: IUserResponse;
}

export type RequestOtpPayload = {
  email: string;
};

export interface IUserResponse {
  id: number;
  fullName: string;
  email: string;
  role: string;
  avatar: string | null;
}
