import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { transfer } from './utils'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

const account = new Account(HexString.ensure('0x6e79525a7f5973567a0d0ef1aaabd60c0852039300a816da0cd4ccec68e25756').toUint8Array(), undefined)
console.log('Account: ' + account.address());


const account2 = new Account(HexString.ensure('0x26630d32b25fc5559f87e78e8db314b35a73b321685488dea42b14e557e234e8').toUint8Array(), undefined)
console.log('Account: ' + account2.address());

transfer(client, account, account2.address().toString(), 10)
