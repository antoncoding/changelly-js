import { request } from './api'

export class Changelly {
  constructor(apiKey, apiSecret, uri) {
    if (!apiKey) throw Error('Missing api-key')
    if (!apiSecret) throw Error('Missing api-secret')
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.uri = uri || 'https://api.changelly.com'
  }

  /**
   * Returns a list of enabled currencies as a flat array.
   * @returns {Promise<Array<string>>}
   */
  async getCurrencies() {
    return await this.postAPI('getCurrencies')
  }

  /**
   * Returns a full list of currencies as an array of objects. 
   * Each object has an "enabled" field displaying current availability of a coin.
   * @returns {Promise<Array<{name:string, ticker:string, fullName:string, enabled:boolean, fixRateEnabled:boolean, payingConfirmations:number, extraIdName: string| null, addressUrl:string, transactionUrl:string, image:string, fixedTime:number}>>}
   */
  async getCurrenciesFull() {
    return await this.postAPI('getCurrenciesFull')
  }

  /**
   * Returns a minimum allowed payin amount required for a currency pair. 
   * Amounts less than a minimal will most likely fail the transaction.
   * @param {string} from 
   * @param {string} to 
   * @param {Promise<string>} 
   */
  async getMinAmount(from, to) {
    const params = { from, to }
    return await this.postAPI('getMinAmount', params)
  }

  /**
   * Fetch minimal and maximal amount for current pair.
   * @param {Array<{from:string, to:string}>} pairs
   * @returns {Promise<Array<{ from: string, to: string, minAmountFloat: string, maxAmountFloat:string, minAmountFixed:string, maxAmountFixed:string }>> }
   */
  async getPairsParams(pairs) {
    return await this.postAPI('getPairsParams', pairs)
  }

  /**
   * Returns estimated exchange values with your API partner fee included.
   * @param {Array<{from:string, to: string, amount: string}>} pairs
   * @returns {Promise<Array<string>>}
   */
  async getExchangeAmount(pairs) {
    return await this.postAPI('getExchangeAmount', pairs)
  }

  /**
   * Returns if a given address is valid or not for a given currency.
   * @param {string} currency 
   * @param {string} address
   * @returns {Promise<{result: boolean}>} 
   */
  async validateAddress(currency, address) {
    const params = { currency, address }
    return await this.postAPI('validateAddress', params)
  }

  /**
   * Creates a new transaction, generates a pay-in address and 
   * returns Transaction object with an ID field to track a transaction status.
   * @param {string} from 
   * @param {string} to 
   * @param {string} address 
   * @param {string} amount 
   * @param {string} extraId
   * @param {string} refundAddress
   * @param {string} refundExtraId
   * @returns {Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, amountExpectedFrom: string,status: string,currencyFrom: string,currencyTo: string,amountTo: number, amountExpectedTo: string, payinAddress: string, payoutAddress: string, createdAt: string, kycRequired: boolean }> }
   */
  async createTransaction(from, to, address, amount, extraId=null, refundAddress=null, refundExtraId=null) {
    const params = { from, to, address, amount, extraId, refundAddress, refundExtraId }
    return await this.postAPI('createTransaction', params)
  }

  /**
   * Returns fix rate for target pairs associate with rateId that can be used for 2 minutes
   * @param {Array<{from:string, to:string}>} pairs
   * @returns {Promise<Array<{ id: string,  result: string, from: string, to: string, 
   *                           max: string, maxFrom: string, maxTo: string, min: string, minFrom: string, minTo: string }>>} 
   */
  async getFixRate(pairs) {
    return await this.postAPI('getFixRate', pairs)
  }

  /**
   * Returns fix rate for target pairs associate with rateId that can be used for 30 seconds
   * @param {Array<{from:string, to:string, amountFrom:string}>} pairs
   * @returns {Promise<Array<{ id:string, rate:string, from:string, to:string, amountFrom:string, amountTo:string }>>}
   */
  async getFixRateForAmount(pairs) {
    return await this.postAPI('getFixRateForAmount', pairs)
  }

  /**
   * Returns rate for all available currency pairs associate with rateId that can be used for 2 minutes
   * @returns {Promise<Array<{ id: string, result: string, from: string, to: string, max: string, maxFrom: string, maxTo: string, min: string, minFrom: string, minTo: string }>>} 
   */
  async getFixRateBulk() {
    return await this.postAPI('getFixRateBulk')
  }

  /**
   * Create fix rate transaction. Only provide one of (amountFrom, amountTo)
   * @param {string} from 
   * @param {string} to 
   * @param {string} address 
   * @param {string} rateId 
   * @param {string} refundAddress 
   * @param {string} amountFrom 
   * @param {string} amountTo
   * @param {string} extraId
   * @param {string} refundExtraId
   * @returns {Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, refundAddress: string, amountExpectedFrom: string, amountExpectedTo: string, kycRequired: boolean, payTill: string, status: string, currencyFrom: string, currencyTo: string, amountTo: 0, payinAddress: string, payoutAddress: string, createdAt: string }>} 
   */
  async createFixTransaction(from, to, address, rateId, refundAddress, amountFrom=null, amountTo=null, extraId=null, refundExtraId=null) {
    if (amountFrom && amountTo) throw new Error('Only specify one of amountTo or amountFrom')
    const params = (amountFrom)
      ? { from, to, address, amountFrom,  rateId, refundAddress, extraId, refundExtraId } 
      : { from, to, address, amountTo,    rateId, refundAddress, extraId, refundExtraId }
    return await this.postAPI('createFixTransaction', params)
  }

  /**
   * Returns status of a given transaction using a transaction ID provided.
   * @param {string} id 
   * @returns {Promise<string>}
   */
  async getStatus(id) {
    const params = { id }
    return await this.postAPI('getStatus', params)
  }

  /**
   * Returns an array of all transactions or a filtered list of transactions
   * @param {{currency?: string, address?: string, extraId?: string, limit?: number, offset?:number}}
   * @returns {Promise<Promise<Array<{ id: string, createdAt: number, type: string, moneyReceived: number, moneySent: number, rate: string, payinConfirmations: string, status: string, currencyFrom: string, currencyTo: string, payinAddress: string, payinExtraId: null|string, payinExtraIdName: null|string, payinHash: null|string, amountExpectedFrom: string, payoutAddress: string, payoutExtraId: null|string, payoutExtraIdName: null|string, payoutHash: null|string, refundHash: null|string, amountFrom: string, amountTo: string, amountExpectedTo: string, networkFee: string, changellyFee: string, apiExtraFee: string, totalFee: null|string, fiatProviderId: null|string, fiatProvider: null|string, fiatProviderRedirect: null|string }>>>}
   */
  async getTransactions(filter) {
    return await this.postAPI('getTransactions', filter)
  }

  /**
   * Sign params and post to Changelly server
   * @param {string} method 
   * @param {object} params
   * @returns {Promise<any>}
   */
  async postAPI(method, params={}) {
    return await request(this.uri, method, params, this.apiKey, this.apiSecret)
  }

}
