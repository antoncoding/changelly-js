
import { request } from './api'

export default class Changelly {
  constructor(apiKey, apiSecret) {
    if(!apiKey) throw Error('Missing api-key')
    if(!apiSecret) throw Error('Missing api-secret')
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  async getCurrencies() {
    return await request('getCurrencies', {}, this.apiKey, this.apiSecret)
  }

}