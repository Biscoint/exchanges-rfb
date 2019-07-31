import SimpleSchema from 'simpl-schema';
import { cpf, cnpj } from 'cpf-cnpj-validator';

export const exchangeDataSchema = new SimpleSchema({
    exchange_name: {
      type: String,
      min: 1,
      max: 80,
    },
    exchange_cnpj: {
      type: String,
      custom: function () {
          return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
      },
    },
    exchange_url: {
      type: String,
      min: 1,
      max: 80,
      regEx: SimpleSchema.RegEx.Url,
    },
});

export const buySellOperationSchema = new SimpleSchema({
    date: {
        type: Date,
        autoValue: function() {
            if(typeof this.value === 'string'){
                var m = this.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) ? this.value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/) : this.value.match(/^(\d{1,2})(\d{1,2})(\d{4})$/);
                return (m) ? new Date(m[3], m[2]-1, m[1]) : undefined;
            }
        }
    },
    id: {
        type: String,
        min: 1,
        max: 1024,
    },
    brl_value: {
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
            }
        },
        custom: function() {
            return this.value.toFixed(2).length-1 <= 16 ? undefined : 'Value exceeds the maximum allowed digits.'
        }
    },
    coin_symbol: {
        type: String,
        min: 1,
        max: 10,
    },
    coin_quantity: {
        type: Number,
        autoValue: function() {
            if(typeof this.value === 'string'){
                return Number(this.value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            }
        },
        custom: function() {
            return this.value.toFixed(10).length-1 <= 30 ? undefined : 'Value exceeds the maximum allowed digits.'
        }
    },
    buyer_id_type: {
        type: String,
        allowedValues: ['CPF', 'CNPJ', 'NIF_PF', 'NIF_PJ', 'PASSPORT', 'COUNTRY_NO_ID', 'USER_NO_ID'],
    },
    buyer_country: {
        type: String,
        min: 2,
        max: 2,
    },
    buyer_document: {
        type: String,
        min: 1,
        max: 30,
        autoValue: function () {
            if(this.siblingField('buyer_id_type') === 'CPF' || this.siblingField('buyer_id_type') === 'CNPJ'){
                return this.value.match(/\d+/g).join('');
            }
        },
        custom: function() {
            if(this.siblingField('buyer_id_type') === 'CPF'){
                return cpf.isValid(this.value) ? undefined : 'Invalid CPF';
            }
            if(this.siblingField('buyer_id_type') === 'CNPJ'){
                return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
            }
        },
    },
    buyer_fullname: {
        type: String,
        min: 1,
        max: 80,
    },
    buyer_address: {
        type: String,
        min: 1,
        max: 120
    },
    seller_id_type: {
        type: String,
        allowedValues: ['CPF', 'CNPJ', 'NIF_PF', 'NIF_PJ', 'PASSPORT', 'COUNTRY_NO_ID', 'USER_NO_ID'],
    },
    seller_country: {
        type: String,
        min: 2,
        max: 2,
    },
    seller_document: {
        type: String,
        max: 30,
        autoValue: function () {
            if(this.siblingField('buyer_id_type') === 'CPF' || this.siblingField('buyer_id_type') === 'CNPJ'){
                return this.value.match(/\d+/g).join('');
            }
        },
        custom: function() {
            if(this.siblingField('buyer_id_type') === 'CPF'){
                return cpf.isValid(this.value) ? undefined : 'Invalid CPF';
            }
            if(this.siblingField('buyer_id_type') === 'CNPJ'){
                return cnpj.isValid(this.value) ? undefined : 'Invalid CNPJ';
            }
        },
    },
    seller_fullname: {
        type: String,
        min: 1,
        max: 80,
    },
    seller_address: {
        type: String,
        min: 1,
        max: 120
    }
});