declare module 'changelly-js' {
  class Changelly {
    constructor(apiKey:string, apiSecret:string)

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
     * Returns estimated exchange value with your API partner fee included.
     */
    getExchangeAmount(from:string, to:string, amount:string):Promise<string>

    /**
     * Returns if a given address is valid or not for a given currency.
     */
    validateAddress(currency:string, address:string):Promise<{result: boolean}>

    /**
     * Creates a new transaction, generates a pay-in address and returns Transaction object with an ID field to track a transaction status.
     */
    createTransaction(from:string, to:string, address:string, amount: string):Promise<{ id: string, apiExtraFee: string, changellyFee: string, payinExtraId: string|null, amountExpectedFrom: string,status: string,currencyFrom: string,currencyTo: string,amountTo: number,amountExpectedTo: string,payinAddress: string,payoutAddress: string,createdAt: string,kycRequired: boolean }> 

    /**
     * Returns status of a given transaction using a transaction ID provided.
     */
    getStatus(id:string): Promise<string>

    /**
     * Returns an array of all transactions or a filtered list of transactions
     */
    getTransactions(): Promise<Promise<Array<{ id: string, createdAt: number, type: string, moneyReceived: number, moneySent: number, rate: string, payinConfirmations: string, status: string, currencyFrom: string, currencyTo: string, payinAddress: string, payinExtraId: null|string, payinExtraIdName: null|string, payinHash: null|string, amountExpectedFrom: string, payoutAddress: string, payoutExtraId: null|string, payoutExtraIdName: null|string, payoutHash: null|string, refundHash: null|string, amountFrom: string, amountTo: string, amountExpectedTo: string, networkFee: string, changellyFee: string, apiExtraFee: string, totalFee: null|string, fiatProviderId: null|string, fiatProvider: null|string, fiatProviderRedirect: null|string }>>>
  }
}