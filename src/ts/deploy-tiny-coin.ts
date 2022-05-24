import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { executeTransactionWithPayload, publishModule, registerCoin } from './utils'
import * as fs from 'fs'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')


/** Initializes the new coin */
async function initializeCoin(
  accountFrom: Account,
  coinTypeAddress: string
): Promise<string> {
  let payload = {
    type: "script_function_payload",
    function: `0x1::ManagedCoin::initialize`,
    type_arguments: [`${coinTypeAddress}::TinyCoin::TinyCoin`],
    arguments: [
      Buffer.from("TinyCoin", "utf-8").toString("hex"),
      Buffer.from("TC", "utf-8").toString("hex"),
      "6",
      false,
    ],
  };
  return await executeTransactionWithPayload(client, accountFrom, payload);
}

/** Init account */
const account = new Account(HexString.ensure('0x904c57638a81b30b1c58f5852dfcf8b04fa53dec2df385c35336582d76e493d1').toUint8Array(), undefined)
console.log('Account: ' + account.address())

/** Read TinyCoin.mv */
const moduleHex = fs.readFileSync('/Users/admin/Documents/demo-wallet-token/src/tinycoin/build/tinycoin/bytecode_modules/TinyCoin.mv').toString("hex");
/** Publish module TinyCoin */
publishModule(client, account, moduleHex)
.then(txHash => client.waitForTransaction(txHash))
.then(_ => initializeCoin(account, account.address().toString()))
.then(txHash => client.waitForTransaction(txHash))
.then(console.log)

