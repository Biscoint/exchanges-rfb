const Exchange = require("../index").default
const { expect } = require('chai')
const fs = require('fs')

describe('Exchange', () => {
  const biscointTestex = new Exchange({
    exchange_name: 'BiscointTestex', 
    exchange_cnpj: '17.869.530/0001-73', 
    exchange_url: 'https://testex.biscoint.io' 
  })


  it('should be instance of exchange', () => {
    expect(biscointTestex).to.be.an.instanceOf(Exchange)
  })

  it('should add buy sell operation', () => {
    biscointTestex.addBuySellOperation({ 
      date: '25/05/2019', 
      id: 'a12345', 
      brl_value: 'R$ 1500,80', 
      brl_fees: 'R$ 1,49', 
      coin_symbol: 'BTC', 
      coin_quantity: '0.0000001', 

      buyer_identity_type: 'CPF', 
      buyer_country: 'BR', 
      buyer_document: '442.467.420-74', 
      buyer_fullname: 'NOME COMPLETO', 
      buyer_address: 'Rua Nao Existente QD 0 LT 0', 

      seller_identity_type: 'CPF', 
      seller_country: 'BR', 
      seller_document: '438.089.600-51', 
      seller_fullname: 'NOME COMPLETO', 
      seller_address: 'Rua Nao Existente QD 0 LT 0', 
    })
  })

  it('should add permutation operation', () => {
    biscointTestex.addPermutationOperation({ 
      date: '10/05/2019',

      user1_coin_symbol: 'BTC',
      user1_coin_quantity: '0.01',
      user1_identity_type: 'CPF',
      user1_country: 'BR',

      user1_fullname: 'CR. HOLYVEYRAH',
      user1_address: 'RUA DAS PIRAMIDES, QD 10, LT 17',

      user2_coin_symbol: 'USDT',
      user2_coin_quantity: '1003.00',
      user2_identity_type: 'NIF_PJ',
      user2_country: 'US',

      user2_fullname: 'BITEX EXCHANGE',

    })
  })

  it('should add deposit operation', () => {
    biscointTestex.addDepositOperation({
      date: 1564672373,
      id: 'REALLY_UNIQUE_ID',
      brl_fees: 0,

      coin_symbol: 'BTC',
      coin_quantity: 0.000004,

      identity_type: 'CNPJ',
      country: 'BR',

      fullname: 'CASA DE CAMBIO',
    })
  })


  it('should be equal to example-output', () => {
    const example = fs
      .readFileSync('test/example-output')
      .toString()

    const e = expect(
      biscointTestex.exportFile()
    )
    .to.be.a('string')
    .to.equal(example)
  })
    
})

