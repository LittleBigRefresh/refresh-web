export interface ApiAuthenticationResponse {
  tokenData: string;
  userId: string;
  expiresAt: Date;

  resetToken: string | undefined;
}
