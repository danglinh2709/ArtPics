export interface ICreateUserRequest {
  fullName: string;
  email: string;
  password: string;
}
export interface IUpdateUserRequest extends ICreateUserRequest {}
