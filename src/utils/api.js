import { node } from "../config/config.json";
const { apiClient, cryptography } = require("@liskhq/lisk-client");
const RPC_ENDPOINT = node;

let clientCache;

export const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
  }
  return clientCache;
};

export const getAccount = async (address) => {
  // get account details based on Lisk (lsk) address
  const client = await getClient();
  const account = await client.account.get(
    cryptography.getAddressFromBase32Address(address)
  );
  return account;
};
