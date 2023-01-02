# Authorization with Metamask

In this article, I will discuss the authorization method that should be used in decentralized applications (dApps) with MetaMask.

I assume that you know that login and register operations in dapps projects are done through wallet applications such as Metamask. Wallet applications save us the cost of preparing login, register pages and infrastructure of these with the functions they provide. In addition to this, these wallet structures also offer us many other features, one example of which can be the authorization system. The authorization system should be as follows in traditional architecture:

<img src="https://miro.medium.com/max/1400/1*W4nzXMZkOmhXns22ieNExA.webp"/>

In this architecture, as we see, we make transactions with the Wallet address received in the backend and produce a token, and then send it to the frontend. This token is sent to the backend with the requests in the header, and authorization is provided.

We can easily achieve all of these with function provided to us by wallet applications. Here is the architecture:

<img src="https://miro.medium.com/max/1400/1*Qn3-f4xD9eLhXgarDHANjw.webp"/>

Here, as we see, wallet applications already produce a token for us. When we send this token to the backend and verify it, we can obtain the necessary information on the backend. Now, let’s examine how we can implement these in code.

```javascript
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
```

As we can see on the code, after the user logs in using the connectWallet function, the signWallet function produces a token for us using the ethers library. With this produced token, we can now use it in api requests such as post made by the user.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
