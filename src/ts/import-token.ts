import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { registerCoin } from './utils'

const prompt = PromptSync();
const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

// init account
const privateKey = prompt('Input your private key: ');
const account = new Account(HexString.ensure(privateKey).toUint8Array(), undefined)
console.log(`Init account success: ${account.address()}`)

// input your address token
const coinAddress = prompt("Input coin address: ");

// register token address
registerCoin(client, account, coinAddress).then(console.log)
