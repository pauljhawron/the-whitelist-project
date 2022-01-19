import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import whitelistLogo from './assets/whitelist-logo.png';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'TheWLProjectNFT';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const DISCORD_LINK = "https://discord.gg/6ZNnzxxAER"

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">The Whitelist Project</p>
          <p className="sub-text">The Whitelist Project is a collection of 999 whitelist tickets to be used for exclusive access to Solana NFT mints, minting for 0.05 SOL.
            Join the Discord Server with <a href={DISCORD_LINK} target="_blank" rel="noreferrer">this link</a>.</p> 
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div>
          <img alt="Whitelist Logo" className="whitelist-logo" src={whitelistLogo} style={{width: 200, height: 200, padding: 50}}/>
        </div>
        <div className="footer-container">
          <a href ={TWITTER_LINK} target="_blank" rel="noreferrer">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;