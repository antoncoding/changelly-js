export type Pair = {
  from: string;
  to: string;
};

export type PairWithAmount = {
  from: string;
  to: string;
  amountFrom: string;
};

export type PairParam = {
  from: string;
  to: string;
  minAmountFloat: string;
  maxAmountFloat: string;
  minAmountFixed: string;
  maxAmountFixed: string;
};

export type Currency = {
  name: string;
  ticker: string;
  fullName: string;
  enabled: boolean;
  fixRateEnabled: boolean;
  payingConfirmations: number;
  extraIdName: string | null;
  addressUrl: string;
  transactionUrl: string;
  image: string;
  fixedTime: number;
};

export type FixRate = {
  id: string;
  result: string;
  from: string;
  to: string;
  max: string;
  maxFrom: string;
  maxTo: string;
  min: string;
  minFrom: string;
  minTo: string;
};

export type FixRateWithAmount = {
  id: string;
  rate: string;
  from: string;
  to: string;
  amountFrom: string;
  amountTo: string;
};

export type FloatExchangeAmount = {
  from: string;
  to: string;
  networkFee: string;
  amount: string;
  result: string;
  visibleAmount: string;
  rate: string;
  fee: string;
};

export type FloatTransaction = {
  id: string;
  apiExtraFee: string;
  changellyFee: string;
  payinExtraId: string | null;
  amountExpectedFrom: string;
  status: string;
  currencyFrom: string;
  currencyTo: string;
  amountTo: number;
  refundAddress: string;
  amountExpectedTo: string;
  payinAddress: string;
  payoutAddress: string;
  createdAt: string;
  kycRequired: boolean;
};

export type FixTransaction = {
  id: string;
  apiExtraFee: string;
  changellyFee: string;
  payinExtraId: string | null;
  amountExpectedFrom: string;
  status: string;
  currencyFrom: string;
  currencyTo: string;
  amountTo: number;
  refundAddress: string;
  amountExpectedTo: string;
  payTill: string;
  payinAddress: string;
  payoutAddress: string;
  createdAt: string;
  kycRequired: boolean;
};

export type Filter = {
  currency?: string;
  address?: string;
  extraId?: string;
  limit?: number;
  offset?: number;
};

export type TransactionDetail = {
  id: string;
  createdAt: number;
  type: string;
  moneyReceived: number;
  moneySent: number;
  rate: string;
  payinConfirmations: string;
  status: string;
  currencyFrom: string;
  currencyTo: string;
  payinAddress: string;
  payinExtraId: null | string;
  payinExtraIdName: null | string;
  payinHash: null | string;
  amountExpectedFrom: string;
  payoutAddress: string;
  payoutExtraId: null | string;
  payoutExtraIdName: null | string;
  payoutHash: null | string;
  refundHash: null | string;
  amountFrom: string;
  amountTo: string;
  amountExpectedTo: string;
  networkFee: string;
  changellyFee: string;
  apiExtraFee: string;
  totalFee: null | string;
  fiatProviderId: null | string;
  fiatProvider: null | string;
  fiatProviderRedirect: null | string;
};
