import { request } from './api'

import { Pair, PairWithAmount, PairParam, FixRateWithAmount, FixRate, Currency, FloatTransaction, FixTransaction , Filter } from './types'

export class Changelly {
  public readonly uri: string
  private readonly apiKey: string
  private readonly apiSecret: string

  constructor(apiKey: string, apiSecret: string, uri: string) {
    if (!apiKey) throw Error('Missing api-key')
    if (!apiSecret) throw Error('Missing api-secret')
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.uri = uri || 'https://api.changelly.com'
  }

  /**
   * Returns a list of enabled currencies as a flat array.
   */
  async getCurrencies(): Promise<Array<string>> {
    return await this.postAPI('getCurrencies')
  }

  /**
   * Returns a full list of currencies as an array of objects.
   * Each object has an "enabled" field displaying current availability of a coin.
   */
  async getCurrenciesFull(): Promise<Array<Currency>> {
    return await this.postAPI('getCurrenciesFull')
  }

  /**
   * Returns a minimum allowed payin amount required for a currency pair.
   * Amounts less than a minimal will most likely fail the transaction.
   */
  async getMinAmount(from: string, to: string): Promise<string> {
    const params = { from, to }
    return await this.postAPI('getMinAmount', params)
  }

  /**
   * Fetch minimal and maximal amount for current pair.
   */
  async getPairsParams(pairs: Array<Pair>): Promise<Array<PairParam>> {
    return await this.postAPI('getPairsParams', pairs)
  }

  /**
   * Returns estimated exchange values with your API partner fee included.
   */
  async getExchangeAmount(pairs: Array<{ from: string; to: string; amount: string }>): Promise<Array<string>> {
    return await this.postAPI('getExchangeAmount', pairs)
  }

  /**
   * Returns if a given address is valid or not for a given currency.
   */
  async validateAddress(currency: string, address: string): Promise<{ result: boolean }> {
    const params = { currency, address }
    return await this.postAPI('validateAddress', params)
  }

  /**
   * Creates a new transaction, generates a pay-in address and
   * returns Transaction object with an ID field to track a transaction status.
   */
  async createTransaction(
    from: string,
    to: string,
    address: string,
    amount: number,
    extraId: string | null = null,
    refundAddress: string | null = null,
    refundExtraId: string | null = null
  ): Promise<FloatTransaction> {
    const params = { from, to, address, amount, extraId, refundAddress, refundExtraId }
    return await this.postAPI('createTransaction', params)
  }

  /**
   * Returns fix rate for target pairs associate with rateId that can be used for 30 seconds
   */
  async getFixRateForAmount(pairs: Array<PairWithAmount>): Promise<Array<FixRateWithAmount>> {
    return await this.postAPI('getFixRateForAmount', pairs)
  }

  /**
   * Returns fix rate for target pairs associate with rateId that can be used for 2 minutes
   */
  async getFixRate(pairs: Array<Pair>): Promise<Array<FixRate>> {
    return await this.postAPI('getFixRate', pairs)
  }

  /**
   * Returns rate for all available currency pairs associate with rateId that can be used for 2 minutes
   */
  async getFixRateBulk(): Promise<Array<FixRate>> {
    return await this.postAPI('getFixRateBulk')
  }

  /**
   * Create fix rate transaction. Only provide one of (amountFrom, amountTo)
   */
  async createFixTransaction(
    from:string,
    to:string,
    address:string,
    rateId:string,
    refundAddress:string,
    amountFrom: string | null = null,
    amountTo:string|null = null,
    extraId:string|null = null,
    refundExtraId:string|null = null
  ) : Promise<FixTransaction> {
    if (amountFrom && amountTo) throw new Error('Only specify one of amountTo or amountFrom')
    const params = amountFrom
      ? { from, to, address, amountFrom, rateId, refundAddress, extraId, refundExtraId }
      : { from, to, address, amountTo, rateId, refundAddress, extraId, refundExtraId }
    return await this.postAPI('createFixTransaction', params)
  }

  /**
   * Returns status of a given transaction using a transaction ID provided.
   */
  async getStatus(id:string) : Promise<string> {
    const params = { id }
    return await this.postAPI('getStatus', params)
  }

  /**
   * Returns an array of all transactions or a filtered list of transactions
   */
  async getTransactions(filter: Filter) {
    return await this.postAPI('getTransactions', filter)
  }

  /**
   * Sign params and post to Changelly server
   */
  async postAPI(method:string, params = {}) : Promise<any> {
    return await request(this.uri, method, params, this.apiKey, this.apiSecret)
  }
}
