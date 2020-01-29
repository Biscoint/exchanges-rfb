import moment from 'moment';
import {
    exchangeDataSchema,
    buySellOperationSchema,
    permutationOperationSchema,
    depositOperationSchema,
    withdrawOperationSchema,
    paymentOperationSchema,
    otherOperationSchema,
    balanceReportSchema
} from './schemas.js';
import {
    createHeader,
    createBuySellOp,
    createPermutationOp,
    createDepositOp,
    createWithdrawOp,
    createPaymentOp,
    createOtherOp,
    createBalanceReportData,
    createFooter 
} from './rfb_file.js';

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
        this.balanceReport = [];
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

    addBalanceReportData(obj){
        obj = balanceReportSchema.clean(obj);
        balanceReportSchema.validate(obj);
        this.balanceReport.push(obj);
    }

    exportFile(){
        let res = '';
        let totalValue = 0;

        res += createHeader(this.exchange_data);

        const orderByDate = (a, b) => moment(a.date) - moment(b.date);
        this.buySellOps = this.buySellOps.sort(orderByDate);
        this.permutationOps = this.permutationOps.sort(orderByDate);
        this.depositOps = this.depositOps.sort(orderByDate);
        this.withdrawOps = this.withdrawOps.sort(orderByDate);
        this.paymentOps = this.paymentOps.sort(orderByDate);
        this.otherOps = this.otherOps.sort(orderByDate);

        this.buySellOps.forEach(val => {
            totalValue = totalValue + Number(val.brl_value.toFixed(2));
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
        this.balanceReport.forEach(val => {
            res += createBalanceReportData(val);
        });

        res += createFooter({ 
            buySellQuantity: this.buySellOps.length,
            permutationQuantity: this.permutationOps.length,
            depositQuantity: this.depositOps.length,
            withdrawQuantity: this.withdrawOps.length,
            paymentQuantity: this.paymentOps.length,
            otherQuantity: this.otherOps.length,
            balanceReportQuantity: this.balanceReport.length,
            buySellTotal: totalValue,
        });

        return res;
    }
}

export default RFBFile;