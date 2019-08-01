import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const commonSchemas = {
    id: {
        type: String,
        min: 1,
        max: 1024,
    },
    name: {
        type: String,
        min: 1,
        max: 80,
    },
    address: {
        type: String,
        min: 1,
        max: 120
    },
    country: {
        type: String,
        min: 2,
        max: 2,
    },
    identity_type: {
        type: String,
        allowedValues: ['CPF', 'CNPJ', 'NIF_PF', 'NIF_PJ', 'PASSPORT', 'COUNTRY_NO_ID', 'USER_NO_ID'],
    },
    url: {
        type: String,
        min: 1,
        max: 80,
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
    coin: {
        type: Number,
        autoValue: function() {
            if(typeof this.value === 'string'){
                return Number(this.value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            }
        },
        custom: function() {
            return this.value.toFixed(10).length-1 <= 30 ? this.value <= 0 ? undefined : 'Value cannot be zero or less than zero' : 'Value exceeds the maximum allowed digits.';
        }
    },
    coin_symbol: {
        type: String,
        min: 1,
        max: 10,
    },
    document: {
        type: String,
        min: 1,
        max: 30,
        autoValue: function () {
            if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CPF' 
            || this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CNPJ'){
                return this.value.match(/\d+/g).join('');
            }
        },
        custom: function() {
            if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CPF'){
                return cpf.isValid(this.value) ? undefined : 'Invalid CPF';
            }
            if(this.siblingField(this.key.split("_")[0] + '_identity_type').value === 'CNPJ'){
                return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
            }
        },
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
    brl_fees: commonSchemas.brl,
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
    brl_fees: commonSchemas.brl,

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
    brl_fees: commonSchemas.brl,

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
    brl_fees: commonSchemas.brl,

    coin_symbol: commonSchemas.coin_symbol,
    coin_quantity: commonSchemas.coin,

    identity_type: commonSchemas.identity_type,
    country: commonSchemas.country,
    document: commonSchemas.document,
    fullname: commonSchemas.name,
    address: commonSchemas.address,
});