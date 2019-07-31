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
        
        buyer_id_type,
        buyer_country,
        buyer_document,
        buyer_fullname,
        buyer_address,
    
        seller_id_type,
        seller_country,
        seller_document,
        seller_fullname,
        seller_address,
    } = obj;

    const rfb_brl_value = brl_value.toFixed(2).replace(/\./g, ',');
    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_buyer_id_type = (buyer_id_type === 'CPF') ? 1 
    : (buyer_id_type === 'CNPJ') ? 2 
    : (buyer_id_type === 'NIF_PF') ? 3 
    : (buyer_id_type === 'NIF_PJ') ? 4
    : (buyer_id_type === 'PASSPORT') ? 5
    : (buyer_id_type === 'COUNTRY_NO_ID') ? 6
    : (buyer_id_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_buyer_cpf = (buyer_id_type === 'CPF' || buyer_id_type === 'CNPJ') ? buyer_document.match(/\d+/g).join('') : '';
    const rfb_buyer_nif = (buyer_id_type === 'NIF_PF' || buyer_id_type === 'NIF_PJ' || buyer_id_type === 'PASSPORT') ? buyer_document.match(/\d+/g).join('') : '';

    const rfb_seller_id_type = (seller_id_type === 'CPF') ? 1 
    : (seller_id_type === 'CNPJ') ? 2 
    : (seller_id_type === 'NIF_PF') ? 3 
    : (seller_id_type === 'NIF_PJ') ? 4
    : (seller_id_type === 'PASSPORT') ? 5
    : (seller_id_type === 'COUNTRY_NO_ID') ? 6
    : (seller_id_type === 'USER_NO_ID') ? 7
    : '';

    const rfb_seller_cpf = (seller_id_type === 'CPF' || seller_id_type === 'CNPJ') ? seller_document : '';
    const rfb_seller_nif = (seller_id_type === 'NIF_PF' || seller_id_type === 'NIF_PJ' || seller_id_type === 'PASSPORT') ? seller_document : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_value}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_buyer_id_type}|${buyer_country}|${rfb_buyer_cpf}|${rfb_buyer_nif}|${buyer_fullname}|${buyer_address}|${rfb_seller_id_type}|${seller_country}|${rfb_seller_cpf}|${rfb_seller_nif}|${seller_fullname}|${seller_address}\r\n`;
}