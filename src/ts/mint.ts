import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { mintCoin } from './utils'
import * as fs from 'fs'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

/** Init account */
const account = new Account(HexString.ensure('0x54e9e280bb3fc199282b7827eb7fd0152e12b1a92dd242221693a5db22a1100d').toUint8Array(), undefined)
console.log('Account: ' + account.address());


const account2 = new Account(HexString.ensure('0x6e79525a7f5973567a0d0ef1aaabd60c0852039300a816da0cd4ccec68e25756').toUint8Array(), undefined)
console.log('Account: ' + account2.address());

mintCoin(client, account, account.address().toString(), account2.address().toString(), 1000).then(console.log)

