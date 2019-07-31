export function createHeader(obj) {
    const line_type = '0000';
    const { exchange_name, exchange_cnpj, exchange_url } = obj;

    const rfb_exchange_cnpj = exchange_cnpj.match(/\d+/g).join('');

    return `${line_type}|${exchange_name}|${rfb_exchange_cnpj}|${exchange_url}\r\n`;
}

export function createFooter(obj) {
    const line_type = '9999';
    const { buySellQuantity, buySellTotal } = obj;

    const rfb_buySellTotal = Number(buySellTotal).toFixed(2).replace(/\./g, ',');
    return `${line_type}|${buySellQuantity}|${rfb_buySellTotal}|0|0|0|0|0|0|0\r\n`;
}

export function createBuySellOp(obj) {
    const line_type = '0110';
    const operation_code = 'I';
    const { 
        date,
        id,
        brl_value,
        brl_fees,
        coin_symbol,
        coin_quantity,
        
        buyer_identity_type,
        buyer_country,
        buyer_document,
        buyer_fullname,
        buyer_address,
    
        seller_identity_type,
        seller_country,
        seller_document,
        seller_fullname,
        seller_address,
    } = obj;

    const rfb_brl_value = brl_value.toFixed(2).replace(/\./g, ',');
    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_buyer_identity_type = (buyer_identity_type === 'CPF') ? 1 
    : (buyer_identity_type === 'CNPJ') ? 2 
    : (buyer_identity_type === 'NIF_PF') ? 3 
    : (buyer_identity_type === 'NIF_PJ') ? 4
    : (buyer_identity_type === 'PASSPORT') ? 5
    : (buyer_identity_type === 'COUNTRY_NO_ID') ? 6
    : (buyer_identity_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_buyer_cpf = (buyer_identity_type === 'CPF' || buyer_identity_type === 'CNPJ') ? buyer_document.match(/\d+/g).join('') : '';
    const rfb_buyer_nif = (buyer_identity_type === 'NIF_PF' || buyer_identity_type === 'NIF_PJ' || buyer_identity_type === 'PASSPORT') ? buyer_document.match(/\d+/g).join('') : '';

    const rfb_seller_identity_type = (seller_identity_type === 'CPF') ? 1 
    : (seller_identity_type === 'CNPJ') ? 2 
    : (seller_identity_type === 'NIF_PF') ? 3 
    : (seller_identity_type === 'NIF_PJ') ? 4
    : (seller_identity_type === 'PASSPORT') ? 5
    : (seller_identity_type === 'COUNTRY_NO_ID') ? 6
    : (seller_identity_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_seller_cpf = (seller_identity_type === 'CPF' || seller_identity_type === 'CNPJ') ? seller_document : '';
    const rfb_seller_nif = (seller_identity_type === 'NIF_PF' || seller_identity_type === 'NIF_PJ' || seller_identity_type === 'PASSPORT') ? seller_document : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_value}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_buyer_identity_type}|${buyer_country}|${rfb_buyer_cpf}|${rfb_buyer_nif}|${buyer_fullname}|${buyer_address}|${rfb_seller_identity_type}|${seller_country}|${rfb_seller_cpf}|${rfb_seller_nif}|${seller_fullname}|${seller_address}\r\n`;

}

export function createPermutationOp(obj) {
    const line_type = '0210';
    const operation_code = 'II';
    const { 
        date,
        id,
        brl_fees,

        user1_coin_symbol,
        user1_coin_quantity,
        user1_identity_type,
        user1_country,
        user1_document,
        user1_fullname,
        user1_address,
    
        user2_coin_symbol,
        user2_coin_quantity,
        user2_identity_type,
        user2_country,
        user2_document,
        user2_fullname,
        user2_address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_user1_coin_quantity = user1_coin_quantity.toFixed(10).replace(/\./g, ',');
    const rfb_user2_coin_quantity = user2_coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_user1_identity_type = (user1_identity_type === 'CPF') ? 1 
    : (user1_identity_type === 'CNPJ') ? 2 
    : (user1_identity_type === 'NIF_PF') ? 3 
    : (user1_identity_type === 'NIF_PJ') ? 4
    : (user1_identity_type === 'PASSPORT') ? 5
    : (user1_identity_type === 'COUNTRY_NO_ID') ? 6
    : (user1_identity_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_user1_cpf = (user1_identity_type === 'CPF' || user1_identity_type === 'CNPJ') ? user1_document.match(/\d+/g).join('') : '';
    const rfb_user1_nif = (user1_identity_type === 'NIF_PF' || user1_identity_type === 'NIF_PJ' || user1_identity_type === 'PASSPORT') ? user1_document.match(/\d+/g).join('') : '';

    const rfb_user2_identity_type = (user1_identity_type === 'CPF') ? 1 
    : (user2_identity_type === 'CNPJ') ? 2 
    : (user2_identity_type === 'NIF_PF') ? 3 
    : (user2_identity_type === 'NIF_PJ') ? 4
    : (user2_identity_type === 'PASSPORT') ? 5
    : (user2_identity_type === 'COUNTRY_NO_ID') ? 6
    : (user2_identity_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_user2_cpf = (user2_identity_type === 'CPF' || user2_identity_type === 'CNPJ') ? user2_document.match(/\d+/g).join('') : '';
    const rfb_user2_nif = (user2_identity_type === 'NIF_PF' || user2_identity_type === 'NIF_PJ' || user2_identity_type === 'PASSPORT') ? user2_document.match(/\d+/g).join('') : '';
    
    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${user1_coin_symbol}|${rfb_user1_coin_quantity}|${rfb_user1_identity_type}|${user1_country}|${rfb_user1_cpf}|${rfb_user1_nif}|${user1_fullname}|${user1_address}${user2_coin_symbol}|${rfb_user2_coin_quantity}|${rfb_user2_identity_type}|${user2_country}|${rfb_user2_cpf}|${rfb_user2_nif}|${user2_fullname}|${user2_address}\r\n`;
}