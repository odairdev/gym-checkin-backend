export class AuthenticationError extends Error {
  constructor() {
    super('Authentication error: Email and/or Password invalid.')
  }
}