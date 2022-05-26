export interface Auth {
  token: string | null;
  authenticated: boolean;
  expiresIn: number;
}
