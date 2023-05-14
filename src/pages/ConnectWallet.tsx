import { ethers } from 'ethers';

function App() {
  const requestAccount = async () => {
   
    if(window.ethereum){
      try{
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log('hello', accounts)
      }catch{
        console.log('hello')
      }
    }
  }
  const connectWallet = async () => {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const wallet = await provider._networkPromise
      console.log('hello', wallet.chainId)
  }

  const handleDisconnect = async () => {
    window.ethereum.disable()
  }


  return (
    <div className="App">
      <button onClick={connectWallet}>Connect wallet</button>
      <button onClick={handleDisconnect}>Disconnect wallet</button>
    </div>
  );
}

export default App;
