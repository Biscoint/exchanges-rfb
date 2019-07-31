var TestEx = require('../index.js');
var testEx = new TestEx({
    exchange_name: 'TestEx',
    exchange_cnpj: '17.869.530/0001-73',
    exchange_url: 'https://testex.example.com'
});

testEx.addBuySellOperation({ 
    date: new Date(2019, 5, 25),
    id: 'a12345',
    brl_value: 'R$ 1500,80',
    brl_fees: 'R$ 1,49',
    coin_symbol: 'BTC',
    coin_quantity: '0.0000001',
    
    buyer_id_type: 'CPF',
    buyer_country: 'BR',
    buyer_document: '442.467.420-74',
    buyer_fullname: 'NOME COMPLETO',
    buyer_address: 'Rua Nao Existente QD 0 LT 0',

    seller_id_type: 'CPF',
    seller_country: 'BR',
    seller_document: '438.089.600-51',
    seller_fullname: 'NOME COMPLETO',
    seller_address: 'Rua Nao Existente QD 0 LT 0',
});

console.log(testEx.exportFile());
