# Decentralized Scholarship Funding DApp

This project is a decentralized application (DApp) built on the Ethereum blockchain that allows users to donate ETH, apply for scholarships, and release funds (admin only).

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js**: (v16.0.0 or later)
- **Ganache**: A personal Ethereum blockchain for local testing.
- **Truffle**: A development framework for smart contracts.
- **MetaMask**: A browser extension for wallet management.

## Project Structure

- `contracts/`: Solidity smart contracts.
- `migrations/`: Deployment scripts.
- `client/`: Front-end HTML and JavaScript (Web3.js).
- `truffle-config.js`: Truffle configuration file.

## Setup Instructions

### 1. Install Dependencies
Run the following command to install Truffle globally (if not already installed):
```bash
npm install -g truffle
```

### 2. Start Ganache
Open Ganache and start a new workspace or use the "Quickstart" option. Ensure it is running on `127.0.0.1:8545`.

### 3. Compile and Deploy Smart Contracts
From the project root directory, run:
```bash
truffle compile
truffle migrate
```
Note the **contract address** of the `Scholarship` contract displayed in the terminal output.

### 4. Configure MetaMask
1. Open MetaMask and select "Import Wallet" using the mnemonic phrase from Ganache.
2. Add a custom network:
   - **Network Name**: Ganache
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
3. Switch to the Ganache network.

### 5. Update Front-End Configuration
Open `client/web3.js` and replace `"YOUR_CONTRACT_ADDRESS"` with the address noted in Step 3.

### 6. Run the Front-End
Navigate to the `client` directory and start a local server:
```bash
cd client
npx http-server
```
Open `http://localhost:8080` in your browser.

## Using the DApp
1. **Connect Wallet**: Click "Connect Wallet" to link MetaMask.
2. **Donate ETH**: Enter an amount and click "Donate".
3. **Apply for Scholarship**: Click "Apply" to submit your application.
4. **Release Funds**: As the admin (the account that deployed the contract), enter a recipient address and click "Release".

## License
MIT
