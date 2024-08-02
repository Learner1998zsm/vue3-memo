export interface LoginForm {
  phone: string;
  password: string;
}
export interface RegisterForm extends LoginForm {
  username: string;
  passwordSure: string;
}
