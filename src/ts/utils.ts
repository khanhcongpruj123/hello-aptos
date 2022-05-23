import { AptosAccount as Account, AptosClient, Types } from "aptos";

export async function executeTransactionWithPayload(
  client: AptosClient,
  accountFrom: Account,
  payload: Types.TransactionPayload
): Promise<string> {
  const txnRequest = await client.generateTransaction(
    accountFrom.address(),
    payload
  );
  console.log(txnRequest)
  const signedTxn = await client.signTransaction(accountFrom, txnRequest);
  const res = await client.submitTransaction(signedTxn);
  return res["hash"];
}

/** Publish a new module to the blockchain within the specified account */
export async function publishModule(
  client: AptosClient,
  accountFrom: Account,
  moduleHex: string
): Promise<string> {
  const payload = {
    type: "module_bundle_payload",
    modules: [{ bytecode: `0x${moduleHex}` }],
  };
  const txnRequest = await client.generateTransaction(
    accountFrom.address(),
    payload
  );
  const signedTxn = await client.signTransaction(accountFrom, txnRequest);
  const res = await client.submitTransaction(signedTxn);
  return res["hash"];
}

export async function registerCoin(
  client: AptosClient,
  coinReceiver: Account,
  coinTypeAddress: string
): Promise<string> {
  let payload: {
    function: string;
    arguments: string[];
    type: string;
    type_arguments: any[];
  };
  payload = {
    type: "script_function_payload",
    function: `0x1::Coin::register`,
    type_arguments: [`${coinTypeAddress}::EggCoin::EggCoin`],
    arguments: [],
  };
  return await executeTransactionWithPayload(client, coinReceiver, payload);
}

export async function getBalance(
  client: AptosClient,
  account: Account
): Promise<Types.AccountResource> {
  const resource = await client.getAccountResource(
    account.address(),
    `0x1::Coin::CoinStore<0xd10801b04e73470295b33c1f0c372aee13e341c45228560d74b9c91ae670fceb::EggCoin::EggCoin>`
  );
  if (resource == null) {
    return null;
  } else {
    return resource;
  }
}

export async function coinInfo(
    client: AptosClient,
    account: Account
  ): Promise<Types.AccountResource> {
    const resource = await client.getAccountResource(
      account.address(),
      `0x1::Coin::CoinInfo<${account.address()}::EggCoin::EggCoin>`
    );
    if (resource == null) {
      return null;
    } else {
      return resource;
    }
  }

export async function mintCoin(
  client: AptosClient,
  coinOwner: Account,
  coinTypeAddress: string,
  receiverAddress: string,
  amount: number
): Promise<string> {
  let payload: {
    function: string;
    arguments: string[];
    type: string;
    type_arguments: any[];
  };
  payload = {
    type: "script_function_payload",
    function: `0x1::ManagedCoin::mint`,
    type_arguments: [`${coinTypeAddress}::EggCoin::EggCoin`],
    arguments: [receiverAddress, amount.toString()],
  };
  return await executeTransactionWithPayload(client, coinOwner, payload);
}

export async function transfer(
    client: AptosClient,
    owner: Account,
    address: string,
    amount: number
  ): Promise<string> {
    let payload: {
      function: string;
      arguments: string[];
      type: string;
      type_arguments: any[];
    };
    payload = {
      type: "script_function_payload",
      function: `0x1::Coin::transfer`,
      type_arguments: [`0xd10801b04e73470295b33c1f0c372aee13e341c45228560d74b9c91ae670fceb::EggCoin::EggCoin`],
      arguments: [address, amount.toString()],
    };
    return await executeTransactionWithPayload(client, owner, payload);
  }

export async function getTransaction(address:String) {

  
}
  

