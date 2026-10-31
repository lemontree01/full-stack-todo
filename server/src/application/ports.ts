export interface PasswordHasher {
  hash(password: string): Promise<string>
  verify(password: string, hash: string): Promise<boolean>
}

export interface TokenService {
  sign(userId: number): string
  /** Returns the user id, or null when the token is invalid or expired. */
  verify(token: string): number | null
}
