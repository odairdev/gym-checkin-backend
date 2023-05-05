export class LateCheckInValidationError extends Error {
  constructor() {
    super('Late Check-In: Check-in is past 20 minutes to be validated')
  }
}