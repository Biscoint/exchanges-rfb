
import { exchangeDataSchema, buySellOperationSchema, permutationOperationSchema, depositOperationSchema, withdrawOperationSchema, paymentOperationSchema, otherOperationSchema } from './schemas.js';
import { createHeader, createBuySellOp, createPermutationOp, createDepositOp, createWithdrawOp, createPaymentOp, createOtherOp, createFooter } from './rfb_file.js';

class RFBFile {
    constructor(exchange_data){
        exchange_data = exchangeDataSchema.clean(exchange_data);
        exchangeDataSchema.validate(exchange_data);

        this.exchange_data = exchange_data;
        this.buySellOps = [];
        this.permutationOps = [];
        this.depositOps = [];
        this.withdrawOps = [];
        this.paymentOps = [];
        this.otherOps = [];
    }

    addBuySellOperation(obj){
        obj = buySellOperationSchema.clean(obj);
        buySellOperationSchema.validate(obj);
        this.buySellOps.push(obj);
    }

    addPermutationOperation(obj){
        obj = permutationOperationSchema.clean(obj);
        permutationOperationSchema.validate(obj);
        this.permutationOps.push(obj);
    }

    addDepositOperation(obj){
        obj = depositOperationSchema.clean(obj);
        depositOperationSchema.validate(obj);
        this.depositOps.push(obj);
    }

    addWithdrawOperation(obj){
        obj = withdrawOperationSchema.clean(obj);
        withdrawOperationSchema.validate(obj);
        this.withdrawOps.push(obj);
    }

    addPaymentOperation(obj){
        obj = paymentOperationSchema.clean(obj);
        paymentOperationSchema.validate(obj);
        this.paymentOps.push(obj);
    }

    addOtherOperation(obj){
        obj = otherOperationSchema.clean(obj);
        otherOperationSchema.validate(obj);
        this.otherOps.push(obj);
    }

    exportFile(){
        let res = '';
        let totalValue = 0;

        res += createHeader(this.exchange_data)
        this.buySellOps.forEach(val => {
            totalValue += val.brl_value;
            res += createBuySellOp(val);
        });
        this.permutationOps.forEach(val => {
            res += createPermutationOp(val);
        });
        this.depositOps.forEach(val => {
            res += createDepositOp(val);
        });
        this.withdrawOps.forEach(val => {
            res += createWithdrawOp(val);
        });
        this.paymentOps.forEach(val => {
            res += createPaymentOp(val);
        });
        this.otherOps.forEach(val => {
            res += createOtherOp(val);
        });

        res += createFooter({ 
            buySellQuantity: this.buySellOps.length,
            permutationQuantity: this.permutationOps.length,
            depositQuantity: this.depositOps.length,
            withdrawQuantity: this.withdrawOps.length,
            paymentQuantity: this.paymentOps.length,
            otherQuantity: this.otherOps.length,
            buySellTotal: totalValue,
        });

        return res;
    }
}

export default RFBFile;
module.exports = RFBFile;