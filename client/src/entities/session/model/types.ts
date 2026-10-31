export interface User {
  /** null while using the app as a guest. */
  login: string | null
  isGuest: boolean
}

export interface Credentials {
  login: string
  password: string
}
