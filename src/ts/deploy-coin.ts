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
    type_arguments: [`${coinTypeAddress}::EggCoin::EggCoin`],
    arguments: [
      Buffer.from("EggCoin", "utf-8").toString("hex"),
      Buffer.from("EC", "utf-8").toString("hex"),
      "6",
      false,
    ],
  };
  return await executeTransactionWithPayload(client, accountFrom, payload);
}

/** Init account */
const account = new Account(HexString.ensure('0x54e9e280bb3fc199282b7827eb7fd0152e12b1a92dd242221693a5db22a1100d').toUint8Array(), undefined)
console.log('Account: ' + account.address())

/** Read EggCoin.mv */
const moduleHex = fs.readFileSync('./src/egg-coin/build/egg-coin/bytecode_modules/EggCoin.mv').toString("hex");
/** Publish module EggCoin */
publishModule(client, account, moduleHex)
.then(txHash => client.waitForTransaction(txHash))
.then(_ => initializeCoin(account, account.address().toString()))
.then(txHash => client.waitForTransaction(txHash))

