import { signMessage } from './sign'

export const request = async (uri:string, method:string, params:any, apiKey:string, apiSecret:string) => {
  const message = constructMessage(method, params)
  const headers = getHeaders(apiKey, apiSecret, message)
  const res = await fetch(uri, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(message)
  })
  
  if (res.status !== 200) {
    let text = await res.text();
    throw text;
  }
  else {
    let jsonRes = await res.json();
    if(jsonRes.error) throw jsonRes.error
    
    return jsonRes.result;
  }
}

const constructMessage = (method:string, params:any) => {
  const id = Date.now().toString() // use date.now as unique id for each request
  const message = {
    jsonrpc: "2.0",
    id,
    method,
    params,
  }
  return message
}

const getHeaders = (apiKey:string, apiSecret:string, message:any) => {
  const sign = signMessage(message, apiSecret)
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
    'sign': sign
  }
  return headers
}