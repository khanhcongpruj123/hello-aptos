import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { registerCoin } from './utils'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

// init account
const privateKey = '0x26630d32b25fc5559f87e78e8db314b35a73b321685488dea42b14e557e234e8'
const account = new Account(HexString.ensure(privateKey).toUint8Array(), undefined)
console.log(`Init account success: ${account.address()}`)

// regiter eggcoin
registerCoin(client, account, '0xd10801b04e73470295b33c1f0c372aee13e341c45228560d74b9c91ae670fceb')
.then(console.log)