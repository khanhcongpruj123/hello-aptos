import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { executeTransactionWithPayload, publishModule, registerCoin } from './utils'
import * as fs from 'fs'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')



/** Init account */
const account = new Account(HexString.ensure('0x72ac9f8bff8d1fde515e7a39cab056b4979e468f6f85eb0c596da230f42383d9').toUint8Array(), undefined)
console.log('Account: ' + account.address())

/** Read TinyCoin.mv */
const moduleHex = fs.readFileSync('/Users/mac/Documents/code/working/aptos/hello-aptos/src/coin-swap/build/BasicCoin/bytecode_modules/BasicCoin.mv').toString("hex");
/** Publish module TinyCoin */
publishModule(client, account, moduleHex)
.then(txHash => client.waitForTransaction(txHash))
.then(console.log)

