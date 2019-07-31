
import { exchangeDataSchema } from './schemas.js';
import { createHeader, createBuySellOp, createFooter } from './rfb_file.js';

class RFBFile {
    constructor(exchange_data){
        exchangeDataSchema.validate(exchange_data);

        this.exchange_data = exchange_data;
        this.buySellOps = [];
    }

    addBuySellOperation(obj){
        this.buySellOps.push(obj);
    }

    exportFile(){
        let res = '';
        let totalValue = 0;

        res += createHeader(this.exchange_data)
        this.buySellOps.forEach(val => {
            totalValue += Number(val.brl_value.replace(/\,/g, '.').match(/[0-9.]/g).join(''));
            res += createBuySellOp(val);
        });

        res += createFooter({ buySellQuantity: this.buySellOps.length, buySellTotal: totalValue })

        return res;
    }
}

export default RFBFile;
module.exports = RFBFile;