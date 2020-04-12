/**
 * CouchDB responses are always a success even if there is an error.
 * Throws if response is an error response.
 *
 * @example
 *   db.find({...})
 *     .then(throwIfError)
 *     .then(onlySuccessResponse => {...})
 *     .catch(allErrors => console.error(allErrors))
 * @param response - CouchDB response
 * @return {*}
 */
export function throwIfError(response) {
  if (response.error) {
    const err = new Error(response.reason)
    err.type = response.error

    throw err
  }

  return response
}
