import { request } from './api'

export class Changelly {
  constructor(apiKey, apiSecret) {
    if (!apiKey) throw Error('Missing api-key')
    if (!apiSecret) throw Error('Missing api-secret')
    this.apiKey = apiKey
    this.apiSecret = apiSecret
  }

  /**
   * Returns a list of enabled currencies as a flat array.
   * @returns {Prmose<Array<string>>}
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
   * Returns estimated exchange value with your API partner fee included.
   * @param {string} from 
   * @param {string} to 
   * @param {string} amount 
   * @returns {Promise<string>}
   */
  async getExchangeAmount(from, to, amount) {
    const params = { from, to, amount }
    return await this.postAPI('getExchangeAmount', params)
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
   * @returns {Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, amountExpectedFrom: string,status: string,currencyFrom: string,currencyTo: string,amountTo: number,amountExpectedTo: string,payinAddress: string,payoutAddress: string,createdAt: string,kycRequired: boolean }> }
   */
  async createTransaction(from, to, address, amount) {
    const params = { from, to, address, amount }
    return await this.postAPI('createTransaction', params)
  }



  async postAPI(method, params={}) {
    return await request(method, params, this.apiKey, this.apiSecret)
  }

}
