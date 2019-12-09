import { signMessage } from './sign'
const fetch = require('node-fetch')

export const request = async (method, params, apiKey, apiSecret) => {
  const message = constructMessage(method, params)
  const headers = getHeaders(apiKey, apiSecret, message)
  const uri = 'http://api.changelly.com'
  console.log(message)
  const res = await fetch(uri, {
    method: 'POST',
    body: message,
    headers
  })
  console.log(res)
  return await res.json()
}

const constructMessage = (method, params) => {
  const id = Date.now() // use date.now as unique id for each request
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
  console.log(headers)
  return headers
}