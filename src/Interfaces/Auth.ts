export interface Auth {
  token: string | null;
  authenticated: boolean;
  isLocked: boolean;
  isEnabled: boolean;
  expiresIn: number;
}
