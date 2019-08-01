function getIdentityRFB(identity_type){
    return (identity_type === 'CPF') ? 1 
    : (identity_type === 'CNPJ') ? 2 
    : (identity_type === 'NIF_PF') ? 3 
    : (identity_type === 'NIF_PJ') ? 4
    : (identity_type === 'PASSPORT') ? 5
    : (identity_type === 'COUNTRY_NO_ID') ? 6
    : (identity_type === 'USER_NO_ID') ? 7
    : '';
}

export function createHeader(obj) {
    const line_type = '0000';
    const { exchange_name, exchange_cnpj, exchange_url } = obj;

    const rfb_exchange_cnpj = exchange_cnpj.match(/\d+/g).join('');

    return `${line_type}|${exchange_name}|${rfb_exchange_cnpj}|${exchange_url}\r\n`;
}

export function createFooter(obj) {
    const line_type = '9999';
    const { buySellQuantity, permutationQuantity, depositQuantity, withdrawQuantity, paymentQuantity, otherQuantity, buySellTotal } = obj;
    const sellOnlyQuantity = 0;
    const annualDeclarationQuantity = 0;

    const rfb_buySellTotal = Number(buySellTotal).toFixed(2).replace(/\./g, ',');
    return `${line_type}|${buySellQuantity}|${rfb_buySellTotal}|${sellOnlyQuantity}|${permutationQuantity}|${depositQuantity}|${withdrawQuantity}|${paymentQuantity}|${otherQuantity}|${annualDeclarationQuantity}\r\n`;
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

    const rfb_buyer_identity_type = getIdentityRFB(buyer_identity_type);

    const rfb_buyer_cpf = (buyer_document && [1,2].indexOf(rfb_buyer_identity_type)) ? buyer_document.match(/\d+/g).join('') : '';
    const rfb_buyer_nif = (buyer_document && [3,4,5].indexOf(rfb_buyer_identity_type)) ? buyer_document.match(/\d+/g).join('') : '';

    const rfb_seller_identity_type = getIdentityRFB(seller_identity_type);

    const rfb_seller_cpf = (seller_document && [1,2].indexOf(rfb_seller_identity_type)) ? seller_document.match(/\d+/g).join('') : '';
    const rfb_seller_nif = (seller_document && [3,4,5].indexOf(rfb_seller_identity_type)) ? seller_document.match(/\d+/g).join('') : '';

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

    const rfb_user1_identity_type = getIdentityRFB(user1_identity_type);
    const rfb_user2_identity_type = getIdentityRFB(user2_identity_type);

    const rfb_user1_cpf = (user1_document && [1,2].indexOf(rfb_user1_identity_type)) ? user1_document.match(/\d+/g).join('') : '';
    const rfb_user1_nif = (user1_document &&[3,4,5].indexOf(rfb_user1_identity_type)) ? user1_document.match(/\d+/g).join('') : '';

    const rfb_user2_cpf = (user2_document && [1,2].indexOf(rfb_user2_identity_type)) ? user2_document.match(/\d+/g).join('') : '';
    const rfb_user2_nif = (user2_document && [3,4,5].indexOf(rfb_user2_identity_type)) ? user2_document.match(/\d+/g).join('') : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${user1_coin_symbol}|${rfb_user1_coin_quantity}|${rfb_user1_identity_type}|${user1_country}|${rfb_user1_cpf}|${rfb_user1_nif}|${user1_fullname}|${user1_address}${user2_coin_symbol}|${rfb_user2_coin_quantity}|${rfb_user2_identity_type}|${user2_country}|${rfb_user2_cpf}|${rfb_user2_nif}|${user2_fullname}|${user2_address}\r\n`;
}

export function createDepositOp(obj) {
    const line_type = '0410';
    const operation_code = 'IV';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        identity_type,
        country,
        document,
        fullname,
        address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_identity_type = getIdentityRFB(identity_type);

    const rfb_cpf = (document && [1,2].indexOf(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';
    const rfb_nif = (document &&[3,4,5].indexOf(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_identity_type}|${country}|${rfb_cpf}|${rfb_nif}|${fullname}|${address}\r\n`;
}

export function createWithdrawOp(obj) {
    const line_type = '0510';
    const operation_code = 'V';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        identity_type,
        country,
        document,
        fullname,
        address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_identity_type = getIdentityRFB(identity_type);

    const rfb_cpf = (document && [1,2].indexOf(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';
    const rfb_nif = (document && [3,4,5].indexOf(rfb_identity_type)) ? document.match(/\d+/g).join('') : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_identity_type}|${country}|${rfb_cpf}|${rfb_nif}|${fullname}|${address}\r\n`;
}

export function createPaymentOp(obj) {
    const line_type = '0710';
    const operation_code = 'VII';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        payer_identity_type,
        payer_country,
        payer_document,
        payer_fullname,
        payer_address,

        receiver_identity_type,
        receiver_country,
        receiver_document,
        receiver_fullname,
        receiver_address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_payer_identity_type = getIdentityRFB(payer_identity_type);
    const rfb_receiver_identity_type = getIdentityRFB(receiver_identity_type);

    const rfb_payer_cpf = (payer_document && [1,2].indexOf(rfb_payer_identity_type)) ? payer_document.match(/\d+/g).join('') : '';
    const rfb_payer_nif = (payer_document &&[3,4,5].indexOf(rfb_payer_identity_type)) ? payer_document.match(/\d+/g).join('') : '';

    const rfb_receiver_cpf = (receiver_document && [1,2].indexOf(rfb_receiver_identity_type)) ? receiver_document.match(/\d+/g).join('') : '';
    const rfb_receiver_nif = (receiver_document && [3,4,5].indexOf(rfb_receiver_identity_type)) ? receiver_document.match(/\d+/g).join('') : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_payer_identity_type}|${payer_country}|${rfb_payer_cpf}|${rfb_payer_nif}|${payer_fullname}|${payer_address}|${rfb_receiver_identity_type}|${receiver_country}|${rfb_receiver_cpf}|${rfb_receiver_nif}|${receiver_fullname}|${receiver_address}\r\n`;
}

export function createOtherOp(obj) {
    const line_type = '0910';
    const operation_code = 'IX';
    const {
        date,
        id,
        brl_fees,

        coin_symbol,
        coin_quantity,

        origin_identity_type,
        origin_country,
        origin_document,
        origin_fullname,
        origin_address,

        recipient_identity_type,
        recipient_country,
        recipient_document,
        recipient_fullname,
        recipient_address,
    } = obj;

    const rfb_brl_fees = brl_fees.toFixed(2).replace(/\./g, ',');
    const rfb_coin_quantity = coin_quantity.toFixed(10).replace(/\./g, ',');

    const rfb_origin_identity_type = getIdentityRFB(origin_identity_type);
    const rfb_recipient_identity_type = getIdentityRFB(recipient_identity_type);

    const rfb_origin_cpf = (origin_document && [1,2].indexOf(rfb_origin_identity_type)) ? origin_document.match(/\d+/g).join('') : '';
    const rfb_origin_nif = (origin_document &&[3,4,5].indexOf(rfb_origin_identity_type)) ? origin_document.match(/\d+/g).join('') : '';

    const rfb_recipient_cpf = (recipient_document && [1,2].indexOf(rfb_recipient_identity_type)) ? recipient_document.match(/\d+/g).join('') : '';
    const rfb_recipient_nif = (recipient_document && [3,4,5].indexOf(rfb_recipient_identity_type)) ? recipient_document.match(/\d+/g).join('') : '';

    return `${line_type}|${date}|${id}|${operation_code}|${rfb_brl_fees}|${coin_symbol}|${rfb_coin_quantity}|${rfb_origin_identity_type}|${origin_country}|${rfb_origin_cpf}|${rfb_origin_nif}|${origin_fullname}|${origin_address}|${rfb_recipient_identity_type}|${recipient_country}|${rfb_recipient_cpf}|${rfb_recipient_nif}|${recipient_fullname}|${recipient_address}\r\n`;
}