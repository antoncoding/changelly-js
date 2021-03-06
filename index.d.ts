declare module 'changelly-js' {
  class Changelly {
    constructor(apiKey:string, apiSecret:string, uri?:string)

    /**
     * Returns a list of enabled currencies as a flat array.
     */
    getCurrencies():Promise<Array<string>>

    /**
     * Returns a full list of currencies as an array of objects. Each object has an "enabled" field displaying current availability of a coin.
     */
    getCurrenciesFull():Promise<Array<{name:string, ticker:string, fullName:string, enabled:boolean, fixRateEnabled:boolean, payingConfirmations:number, extraIdName: string| null, addressUrl:string, transactionUrl:string, image:string, fixedTime:number}>>

    /**
     * Returns a minimum allowed payin amount required for a currency pair. 
     * Amounts less than a minimal will most likely fail the transaction.
     */
    getMinAmount(from:string, to:string):Promise<string>

    /**
     * [NEW] Fetch minimal and maximal amount for current pair.
     */
    getPairsParams(pairs: Array<{from:string, to:string}>): Promise<Array<{ from: string, to: string, minAmountFloat: string, maxAmountFloat:string, minAmountFixed:string, maxAmountFixed:string }>> 

    /**
     * Returns estimated exchange values with your API partner fee included.
     */
    getExchangeAmount(paris:Array<{from:string, to:string, amount:string}>):Promise<Array<string>>

    /**
     * Returns if a given address is valid or not for a given currency.
     */
    validateAddress(currency:string, address:string):Promise<{result: boolean}>

    /**
     * Creates a new transaction, generates a pay-in address and returns Transaction object with an ID field to track a transaction status.
     */
    createTransaction(from:string, to:string, address:string, amount: string, extraId?: string, refundAddress?: string, refundExtraId?:string):Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, amountExpectedFrom: string,status: string,currencyFrom: string,currencyTo: string,amountTo: number,amountExpectedTo: string,payinAddress: string,payoutAddress: string,createdAt: string,kycRequired: boolean }> 

    /**
     * Returns fix rate for target pairs associate with rateId that can be used for 2 minutes
     */ 
    getFixRate(pairs: Array<{ from:string, to:string}> ): Promise<Array<{ id: string, result: string, from: string, to: string, max: string, maxFrom: string, maxTo: string, min: string, minFrom: string, minTo: string }>>

    /**
     * [NEW] Returns fix rate for target pairs associate with rateId that can be used for 30 seconds.
     * Also fetch fixed amount according to additional parameter field `amountFrom`.
     */
    getFixRateForAmount(pair: Array<{from:string, to:string, amountFrom:string}>) : Promise<Array<{ id:string, rate:string, from:string, to:string, amountFrom:string, amountTo:string }>>

    /**
     * Returns rate for all available currency pairs associate with rateId that can be used for 2 minutes
     */
    getFixRateBulk():Promise<Array<{ id: string, result: string, from: string, to: string, max: string, maxFrom: string, maxTo: string, min: string, minFrom: string, minTo: string }>>

    /**
     * Create fix rate transaction. Only provide one of (amountFrom, amountTo)
     */
    createFixTransaction(from: string, to:string, address: string, rateId:string, refundAddress:string, 
      amountFrom?:string, amountTo?:string, extraId?:string, refundExtraId?:string)
      : Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, refundAddress: string, amountExpectedFrom: string, amountExpectedTo: string, kycRequired: boolean, payTill: string, status: string, currencyFrom: string, currencyTo: string, amountTo: 0, payinAddress: string, payoutAddress: string, createdAt: string }>

    /**
     * Returns status of a given transaction using a transaction ID provided.
     */
    getStatus(id:string): Promise<string>

    /**
     * Returns an array of all transactions or a filtered list of transactions
     */
    getTransactions(filter: {currency?: string, address?: string, extraId?: string, limit?: number, offset?:number}): Promise<Array<{ id: string, createdAt: number, type: string, moneyReceived: number, moneySent: number, rate: string, payinConfirmations: string, status: string, currencyFrom: string, currencyTo: string, payinAddress: string, payinExtraId: null|string, payinExtraIdName: null|string, payinHash: null|string, amountExpectedFrom: string, payoutAddress: string, payoutExtraId: null|string, payoutExtraIdName: null|string, payoutHash: null|string, refundHash: null|string, amountFrom: string, amountTo: string, amountExpectedTo: string, networkFee: string, changellyFee: string, apiExtraFee: string, totalFee: null|string, fiatProviderId: null|string, fiatProvider: null|string, fiatProviderRedirect: null|string }>>
  }
}