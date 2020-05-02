/**
 * @typedef CouchDBErrorResponse
 *
 * @property {string} [error] - Error type. Available if response code is 4xx
 * @property {string} [reason] - Error description. Available if response code is 4xx
 */

class TypedError extends Error {
  /**
   * @param {CouchDBErrorResponse} response - CouchDB Response
   */
  constructor(response) {
    super(response.reason)
    this.type = response.error
  }
}

/**
 * CouchDB responses are always a success even if there is an error.
 * Throws if response is an error response.
 *
 * @example
 *   db.find({...})
 *     .then(throwIfError)
 *     .then(onlySuccessResponse => {...})
 *     .catch(allErrors => console.error(allErrors))
 * @param {CouchDBErrorResponse} response - CouchDB response
 * @returns {CouchDBErrorResponse}
 */
export function throwIfError(response) {
  if (response.error) {
    throw new TypedError(response)
  }

  return response
}
