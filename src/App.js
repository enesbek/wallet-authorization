import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import axios from "axios";

function App() {
  const [account, setAccount] = useState("isn't connected");

  const connectWallet = async () => {
    if (!window.ethereum) {
      window.open("https://metamask.io/download/");
    } else {
      let accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
          console.error(err);
        });

      setAccount(accounts[0]);
      const token = await signWallet();

      axios.post("/registration", {
        headers: {
          Authorization: token,
        },
      });
    }
  };

  const signWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const signedMessage = await signer
      .signMessage("Message: This should be nonce value")
      .catch((err) => {
        console.error(err);
      });

    return signedMessage;
  };

  return (
    <div className="App">
      <div>Wallet addr: {account}</div>
      <button style={{ marginTop: "20px" }} onClick={connectWallet}>
        Connect Wallet
      </button>
    </div>
  );
}

export default App;
