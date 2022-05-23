import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { getTransactions } from './api'

/** Init account */
const account = new Account(HexString.ensure('0x6e79525a7f5973567a0d0ef1aaabd60c0852039300a816da0cd4ccec68e25756').toUint8Array(), undefined)
console.log('Account: ' + account.address())

getTransactions(account.address().toString()).then(v => console.log(v))

