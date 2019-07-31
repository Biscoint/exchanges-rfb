
import { exchangeDataSchema, buySellOperationSchema } from './schemas.js';
import { createHeader, createBuySellOp, createFooter } from './rfb_file.js';

class RFBFile {
    constructor(exchange_data){
        exchange_data = exchangeDataSchema.clean(exchange_data);
        exchangeDataSchema.validate(exchange_data);

        this.exchange_data = exchange_data;
        this.buySellOps = [];
    }

    addBuySellOperation(obj){
        if(typeof obj.date === 'number') obj.date = obj.date.toString();

        obj = buySellOperationSchema.clean(obj);
        buySellOperationSchema.validate(obj);
        this.buySellOps.push(obj);
    }

    exportFile(){
        let res = '';
        let totalValue = 0;

        res += createHeader(this.exchange_data)
        this.buySellOps.forEach(val => {
            totalValue += val.brl_value;
            res += createBuySellOp(val);
        });

        res += createFooter({ buySellQuantity: this.buySellOps.length, buySellTotal: totalValue })

        return res;
    }
}

export default RFBFile;
module.exports = RFBFile;