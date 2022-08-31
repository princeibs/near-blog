import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

// Connect contract to blockchain before loading app
export async function initializeContract() {
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );
  window.walletConnection = new WalletConnection(near);
  window.accountId = window.walletConnection.getAccountId();
  window.contract = new Contract(
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      // list of methods that don't change blockchain state
      viewMethods: ["viewBlog", "allBlogs"],
      // list of methods that change blockchain state
      changeMethods: ["likeBlog", "buyCoffee", "createBlog"],
    }
  );
}

// Return account balance of current user
export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

// Get account id of current logged in user (e.g alice.testnet)
export async function getAccountId() {
  return window.walletConnection.getAccountId();
}

// log user into dapp
export function login() {
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

// log user out of dapp
export function logout() {
  window.walletConnection.signOut();
  window.location.reload();
}
