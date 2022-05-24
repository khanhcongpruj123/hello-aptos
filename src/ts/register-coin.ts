import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { registerCoin } from './utils'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

// init account
const privateKey = '0x904c57638a81b30b1c58f5852dfcf8b04fa53dec2df385c35336582d76e493d1'
const account = new Account(HexString.ensure(privateKey).toUint8Array(), undefined)
console.log(`Init account success: ${account.address()}`)

// regiter eggcoin
registerCoin(client, account, '0xd10801b04e73470295b33c1f0c372aee13e341c45228560d74b9c91ae670fceb')
.then(console.log)