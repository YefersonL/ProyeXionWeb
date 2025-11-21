export interface Jwtres {
  user?: {
    id: string,
    name: string,
    email: string,
    role: string
  },
  token?: string,
  message?: string
}