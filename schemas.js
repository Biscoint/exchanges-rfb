import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { cpf, cnpj } from 'cpf-cnpj-validator';

function ensureAllowedCharacters(val) {
    return (this ? this.value : val) || ''.replace(/[^\x20-\x7E]|/g, '');
}

const commonSchemas = {
    id: {
        type: String,
        max: 1024,
        autoValue: ensureAllowedCharacters,
        required: false,
    },
    name: {
        type: String,
        min: 1,
        max: 80,
        autoValue: ensureAllowedCharacters,
    },
    address: {
        type: String,
        max: 120,
        autoValue: ensureAllowedCharacters,
        required: false,
    },
    country: {
        type: String,
        max: 2,
        autoValue: ensureAllowedCharacters,
        required: false,
    },
    identity_type: {
        type: String,
        allowedValues: ['CPF', 'CNPJ', 'NIF_PF', 'NIF_PJ', 'PASSPORT', 'COUNTRY_NO_ID', 'USER_NO_ID'],
    },
    url: {
        type: String,
        min: 1,
        max: 80,
        autoValue: ensureAllowedCharacters,
        regEx: SimpleSchema.RegEx.Url,
    },
    date: {
        type: String,
        autoValue: function() {
            var m = this.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) 
            ? this.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) 
            : this.value.match(/^(\d{1,2})(\d{1,2})(\d{4})$/);

            return (m) ? moment(new Date(m[3], m[2]-1, m[1])).format('DDMMYYYY') 
            : moment(new Date(this.value * 1000)).format('DDMMYYYY') !== 'Invalid date' 
            ? moment(new Date(this.value * 1000)).format('DDMMYYYY') 
            : moment(new Date(this.value)).format('DDMMYYYY') !== 'Invalid date' 
            ? moment(new Date(this.value)).format('DDMMYYYY') 
            : null;
        }
    },
    brl: {
        type: Number,
        autoValue: function() {
            if(typeof this.value === 'string'){
                return Number(this.value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            }
        },
        custom: function() {
            return this.value.toFixed(2).length-1 <= 16 ? undefined : 'Value exceeds the maximum allowed digits.'
        }
    },
    brl_fees: {
        type: Number,
        autoValue: function() {
            if(typeof this.value === 'string'){
                return Number(this.value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            } else if (!this.value) {
                return 0;
            }
        },
        custom: function() {
            return this.value.toFixed(2).length-1 <= 16 ? undefined : 'Value exceeds the maximum allowed digits.'
        },
        required: false,
    },
    coin: {
        type: Number,
        autoValue: function() {
            if(typeof this.value === 'string'){
                return Number(this.value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            }
        },
        custom: function() {
            return this.value.toFixed(10).length-1 <= 30 ? this.value >= 0 ? undefined : 'Value cannot be zero or less than zero' : 'Value exceeds the maximum allowed digits.';
        }
    },
    coin_symbol: {
        type: String,
        min: 1,
        max: 10,
        autoValue: ensureAllowedCharacters,
    },
    document: {
        type: String,
        max: 30,
        autoValue: function () {
            if(this.value){
                if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CPF' 
                || this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CNPJ'){
                    return ensureAllowedCharacters((this.value).match(/\d+/g).join(''));
                }
            }
            return ensureAllowedCharacters(this.value);
        },
        custom: function() {
            if(this.value){
                if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CPF'){
                    return cpf.isValid(this.value) ? undefined : 'Invalid CPF';
                } else if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CNPJ'){
                    return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
                }
            }

        },
        required: false,
    }
};

export const exchangeDataSchema = new SimpleSchema({
    exchange_name: commonSchemas.name,
    exchange_cnpj: {
      type: String,
      custom: function () {
          return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
      },
    },
    exchange_url: commonSchemas.url,
});

export const buySellOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_value: commonSchemas.brl,
    brl_fees: commonSchemas.brl_fees,
    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,
    buyer_identity_type: commonSchemas.identity_type,
    buyer_country: commonSchemas.country,
    buyer_document: commonSchemas.document,
    buyer_fullname: commonSchemas.name,
    buyer_address: commonSchemas.address,
    seller_identity_type: commonSchemas.identity_type,
    seller_country: commonSchemas.country,
    seller_document: commonSchemas.document,
    seller_fullname: commonSchemas.name,
    seller_address: commonSchemas.address
});

export const permutationOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_fees: commonSchemas.brl_fees,

    user1_coin_symbol: commonSchemas.coin_symbol,
    user1_coin_quantity: commonSchemas.coin,
    user1_identity_type: commonSchemas.identity_type,
    user1_country: commonSchemas.country,
    user1_document: commonSchemas.document,
    user1_fullname: commonSchemas.name,
    user1_address: commonSchemas.address,

    user2_coin_symbol: commonSchemas.coin_symbol,
    user2_coin_quantity: commonSchemas.coin,
    user2_identity_type: commonSchemas.identity_type,
    user2_country: commonSchemas.country,
    user2_document: commonSchemas.document,
    user2_fullname: commonSchemas.name,
    user2_address: commonSchemas.address,
});

export const depositOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_fees: commonSchemas.brl_fees,

    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,

    identity_type: commonSchemas.identity_type,
    country: commonSchemas.country,
    document: commonSchemas.document,
    fullname: commonSchemas.name,
    address: commonSchemas.address,
});

export const withdrawOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_fees: commonSchemas.brl_fees,

    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,

    identity_type: commonSchemas.identity_type,
    country: commonSchemas.country,
    document: commonSchemas.document,
    fullname: commonSchemas.name,
    address: commonSchemas.address,
});

export const paymentOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_fees: commonSchemas.brl_fees,

    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,

    payer_identity_type: commonSchemas.identity_type,
    payer_country: commonSchemas.country,
    payer_document: commonSchemas.document,
    payer_fullname: commonSchemas.name,
    payer_address: commonSchemas.address,

    receiver_identity_type: commonSchemas.identity_type,
    receiver_country: commonSchemas.country,
    receiver_document: commonSchemas.document,
    receiver_fullname: commonSchemas.name,
    receiver_address: commonSchemas.address,
});

export const otherOperationSchema = new SimpleSchema({
    date: commonSchemas.date,
    id: commonSchemas.id,
    brl_fees: commonSchemas.brl_fees,

    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,

    origin_identity_type: commonSchemas.identity_type,
    origin_country: commonSchemas.country,
    origin_document: commonSchemas.document,
    origin_fullname: commonSchemas.name,
    origin_address: commonSchemas.address,

    recipient_identity_type: commonSchemas.identity_type,
    recipient_country: commonSchemas.country,
    recipient_document: commonSchemas.document,
    recipient_fullname: commonSchemas.name,
    recipient_address: commonSchemas.address,
});