import fetch from 'isomorphic-fetch'

/**
 * Fetch and deserialize json body
 *
 * @template TRequestBody
 * @template TResponseBody
 * @param {string} url - relative url of the endpoint
 * @param {TRequestBody} data - object you want to post
 * @returns {Promise<TResponseBody>}
 */
export async function post(url, data) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error('failed')
  }

  return await res.json()
}

/**
 * Fetch and deserialize json body
 *
 * @template TBody
 * @param url {string}
 * @returns {Promise<TBody>}
 */
export async function get(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('failed')
  }

  return await res.json()
}

export default get
