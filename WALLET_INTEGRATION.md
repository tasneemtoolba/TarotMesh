# Wallet Integration for Mystical Tarot Reader

## Overview

The Mystical Tarot Reader now supports Flow blockchain wallet integration, allowing users to save their tarot readings and preferences to the blockchain for permanent storage and data ownership.

## Features

### 🔗 Wallet Connection
- Connect your Flow wallet to save data
- View wallet balance and address
- Disconnect wallet when needed
- Real-time connection status

### 💾 Data Saving
- **Tarot Readings**: Save your question, drawn cards, and interpretations
- **User Preferences**: Save theme choices, favorite spreads, and settings
- **Reading History**: Track total readings and last reading date
- **Daily Subscriptions**: Subscribe to daily readings

### 📊 User Profile
- View total number of readings performed
- See favorite tarot spread
- Check last reading timestamp
- Monitor daily reading subscription status

## How to Use

### 1. Connect Your Wallet
1. Click the "🔗 Connect Wallet" button in the sidebar
2. Choose your preferred Flow wallet (Blocto, Dapper, etc.)
3. Approve the connection in your wallet
4. Your wallet address and balance will be displayed

### 2. Save Your Readings
- When you ask for a tarot reading, the system will automatically save it to the blockchain
- You'll see a notification confirming the save was successful
- Your reading history will be updated in real-time

### 3. Save Preferences
- Go to Settings page
- Change themes or other preferences
- If wallet is connected, preferences will be saved to blockchain
- If not connected, changes are saved locally only

### 4. View Your Data
- Check the "📊 Your Journey" section in the sidebar
- See your total readings, favorite spread, and last reading date
- Refresh data to get the latest information from blockchain

## Technical Details

### Blockchain Integration
- **Network**: Flow Testnet (for development)
- **Smart Contract**: TarotReader contract
- **Functions Used**:
  - `startReading()` - Initialize reading session
  - `performReading()` - Record drawn cards
  - `completeReading()` - Save interpretation
  - `setFavoriteSpread()` - Save user preferences
  - `getUserProfile()` - Retrieve user data

### Data Storage
- **On-Chain**: Reading sessions, card draws, interpretations, favorite spreads
- **Local Storage**: Theme preferences, notification settings, auto-save preferences
- **IPFS**: Configuration backups (optional)

### Security
- All transactions require wallet approval
- User data is tied to wallet address
- No private keys stored in the application
- Secure Flow blockchain infrastructure

## Supported Wallets

- **Blocto** (Recommended for beginners)
- **Dapper Wallet**
- **Lilico**
- **Any Flow-compatible wallet**

## Troubleshooting

### Connection Issues
- Ensure you're using a supported Flow wallet
- Check your internet connection
- Try refreshing the page and reconnecting

### Save Failures
- Verify you have sufficient FLOW tokens for transaction fees
- Check that your wallet is properly connected
- Ensure you're on the correct network (Testnet)

### Data Not Loading
- Click the "🔄 Refresh Data" button in the wallet component
- Check your wallet connection status
- Verify the smart contract is deployed and accessible

## Future Enhancements

- [ ] Mainnet deployment
- [ ] Reading sharing between users
- [ ] NFT cards for special readings
- [ ] Community features and leaderboards
- [ ] Advanced analytics and insights
- [ ] Cross-chain compatibility

## Support

For technical support or questions about wallet integration, please refer to the project documentation or create an issue in the repository. 