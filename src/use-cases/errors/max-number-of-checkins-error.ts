export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super('Maximum number of check ins in a day exceeded.')
  }
}