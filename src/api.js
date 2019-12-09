import { signMessage } from './sign'
const fetch = require('node-fetch')

export const request = async (method, params, apiKey, apiSecret) => {
  const message = constructMessage(method, params)
  const headers = getHeaders(apiKey, apiSecret, message)
  const uri = 'https://api.changelly.com'
  const res = await fetch(uri, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(message)
  })
  const jsonRes = await res.json()
  return jsonRes.result
}

const constructMessage = (method, params) => {
  const id = Date.now().toString() // use date.now as unique id for each request
  const message = {
    jsonrpc: "2.0",
    id,
    method,
    params,
  }
  return message
}

const getHeaders = (apiKey, apiSecret, message) => {
  const sign = signMessage(message, apiSecret)
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
    'sign': sign
  }
  return headers
}