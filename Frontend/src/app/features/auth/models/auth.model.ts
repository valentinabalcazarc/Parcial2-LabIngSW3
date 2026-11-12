/** Valor que emite `login-form` al enviar. */
export interface LoginCredentials {
  cedula: string;
  password: string;
}

/** Respuesta de POST /api/auth/signin */
export interface JwtResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
}
