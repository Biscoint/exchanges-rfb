var TestEx = require('../index.js');
var biscointTestex = new TestEx({
    exchange_name: 'BiscointTestex', // Exchange Name
    exchange_cnpj: '17.869.530/0001-73', // Exchange CNPJ
    exchange_url: 'https://testex.biscoint.io' // Exchange URL
});

biscointTestex.addBuySellOperation({ 
    date: new Date(2019, 5, 25), // Input date javascript object
    id: 'a12345', // Operation Id in your exchange
    brl_value: 'R$ 1500,80', // BRL value trade (don't allow thousands separator)
    brl_fees: 'R$ 1,49', // BRL fee trade (don't allow thousands separator)
    coin_symbol: 'BTC', // CRYPTO symbol (BTC for Bitcoin, ETH for Ethereum)
    coin_quantity: '0.0000001', // CRYPTO quantity (don't allow thousands separator)
    
    buyer_id_type: 'CPF', // Document Type. Allowed: CPF, CNPJ, NIF_PF, NIF_PJ, PASSPORT, COUNTRY_NO_ID and USER_NO_ID
    buyer_country: 'BR', // Country code
    buyer_document: '442.467.420-74', // Document number
    buyer_fullname: 'NOME COMPLETO', // Full name
    buyer_address: 'Rua Nao Existente QD 0 LT 0', // Full address

    seller_id_type: 'CPF', // Document Type. Allowed: CPF, CNPJ, NIF_PF, NIF_PJ, PASSPORT, COUNTRY_NO_ID and USER_NO_ID
    seller_country: 'BR', // Country code
    seller_document: '438.089.600-51', // Document number
    seller_fullname: 'NOME COMPLETO', // Full name
    seller_address: 'Rua Nao Existente QD 0 LT 0', // Full address
});

console.log(biscointTestex.exportFile());
