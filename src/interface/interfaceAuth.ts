export interface registerUser {
    email: string;
    password: string;
}

export interface loginUser {
    email: string;
    password: string;
}

export interface LoginResponse {
  success: boolean
  error?: string
  data?: any
}