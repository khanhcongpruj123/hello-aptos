
const URL = 'https://fullnode.devnet.aptoslabs.com';
import axios from 'axios';
export function getTransactions(address: string){
    return axios.get(`${URL}/accounts/${address}/transactions`)
    .then(function (response) {
        const data = response.data||[];
        return data.map((item: any)=>({
            hash: item.hash,
            type: item.type,
            version: item.version,
            success: item.success,
            sender: item.type,
            payload: item.payload
            
        }))
    });
}

export function getTransactionTx(tx: string){
    return axios.get(`${URL}/transactions/${tx}`)
    .then(function (response) {
        const data = response.data||[];
        return data.map((item: any)=>({
            hash: item.hash,
            type: item.type,
            version: item.version,
            success: item.success,
            sender: item.type,
            payload: item.payload
            
        }))
    });
}