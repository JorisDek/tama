// constants
import Web3 from "web3";
import TamaToken from "../../contracts/TamaToken.json";
// log
// import { fetchData } from "../data/dataActions";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  };
};

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  };
};

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  };
};

export const connect = () => {
  return async (dispatch) => {
    dispatch(connectRequest());
    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window?.ethereum?.request({
          method: "eth_requestAccounts",
        });
        
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        // console.log("netwerk: "+networkId);
        
        const tamaTokenNetworkData = await TamaToken.networks[networkId]

        // if (networkId == 137) {
        if (tamaTokenNetworkData) {
          const tamaToken = new web3.eth.Contract(
            TamaToken.abi,
            web3.utils.toChecksumAddress(tamaTokenNetworkData.address)
            // "0xf771E6b187c3e6523F90483E5EeE7A8886E32BAc"
          );

          dispatch(
            connectSuccess({
              account: accounts[0],
              tamaToken: tamaToken,
              web3: web3,
            })
          );
          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          // Add listeners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."));
      }
    } else {
      dispatch(connectFailed("Install Metamask."));
    }
  };
};

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData(account));
  };
};