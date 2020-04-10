import fetch from 'isomorphic-fetch'

/**
 * Fetch and deserialize json body
 * @param url {string}
 * @return {Promise<any>}
 */
async function fetcher(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('failed')
  }

  return await res.json()
}

export default fetcher