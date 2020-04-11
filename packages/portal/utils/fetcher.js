import fetch from 'isomorphic-fetch'

/**
 * Fetch and deserialize json body
 * @param url {string} - relative url of the endpoint
 * @param data {Object<*>} - object you want to post
 * @return {Promise<any>}
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
 * @param url {string}
 * @return {Promise<any>}
 */
export async function get(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('failed')
  }

  return await res.json()
}

export default get
