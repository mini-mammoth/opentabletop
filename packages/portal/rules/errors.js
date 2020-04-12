/**
 * This error indicates bad user input
 */
export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = 400
    this.type = 'bad_request'
  }
}
