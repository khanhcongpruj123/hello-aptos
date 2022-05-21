import { AptosAccount as Account, AptosClient, HexString, Types } from "aptos";
import { Buffer } from 'buffer'
import PromptSync from 'prompt-sync'
import { getBalance } from './utils'
import * as fs from 'fs'

const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')

/** Init account */
const account = new Account(HexString.ensure('0x6e79525a7f5973567a0d0ef1aaabd60c0852039300a816da0cd4ccec68e25756').toUint8Array(), undefined)
console.log('Account: ' + account.address())

getBalance(client, account).then(v => console.log(JSON.stringify(v)))

