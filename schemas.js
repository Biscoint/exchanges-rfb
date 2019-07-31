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
      }
    },
    exchange_url: {
      type: String,
      min: 1,
      max: 80,
      regEx: SimpleSchema.RegEx.Url,
    },
});

export const buySellOperationSchema = new SimpleSchema({
    // TODO
});