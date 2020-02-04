# ChangellyJS

Unofficial Javascript SDK for [Changelly](https://changelly.com/?ref_id=oz145mh990w1b4wr) cryptocurrency exchange service API.

For more detail about this API, visit the [official document](https://old.changelly.com/developers).

[<img src="https://i.imgur.com/GN2626g.png">](https://changelly.com/?ref_id=oz145mh990w1b4wr)

![version](https://img.shields.io/npm/v/changelly-js) ![license](https://img.shields.io/npm/l/changelly-js) ![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/changelly-js)


## Install

```shell
npm install changelly-js
```

## Custom Build

```shell
npm run build
```

## Example

```javascript 
//  nodejs
require("isomorphic-fetch") // install this package to use fetch in nodejs
const { Changelly } = require('changelly-js')

const apiKey = 'your api key'
const apiSecret = 'your api secret'
const changelly = new Changelly(apiKey, apiSecret);

changelly.getExchangeAmount('ltc','eth', '23').then(res => {
  console.log(res)
})
// 6.881168762500000000

changelly.createTransaction('eth', 'btc', '3AT4CYbw8UVNPhPNBrr5YwCrxLquKtFWWx', '0.23')
.then(res => {
  console.log(res)
})
/**
  {
    id: '6308bn10e13o97m7',
    apiExtraFee: '0.5',
    changellyFee: '0.5',
    payinExtraId: null,
    amountExpectedFrom: '0.23',
    status: 'new',
    currencyFrom: 'eth',
    currencyTo: 'btc',
    amountTo: 0,
    amountExpectedTo: '0.00455935',
    payinAddress: '0xda6e060cdedd5ecdfe650b68e04c278ac0fee244',
    payoutAddress: '3AT4CYbw8UVNPhPNBrr5YwCrxLquKtFWWx',
    createdAt: '2019-12-09T03:23:13.000Z',
    kycRequired: false
  }
**/

```
