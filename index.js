require('dotenv').config();

const { Web3 } = require('web3');

// Use new Web3.providers.HttpProvider com 'new' para criar uma instância do provedor
const provider = new Web3.providers.HttpProvider(process.env.BSC_TESTNET_URL);

// Crie uma instância do Web3 com o provedor configurado
const web3 = new Web3(provider);

async function getBalance(wallet) {
    try {
        const balance = await web3.eth.getBalance(wallet);
        console.log(web3.utils.fromWei(balance, 'ether'), 'BNB');
    } catch (error) {
        console.error("Erro ao obter o saldo:", error);
    }
}

async function transfer(to, value) {
    try {
        const gasPrice = await web3.eth.getGasPrice(); // Obter o preço atual do gás
        const nonce = await web3.eth.getTransactionCount(process.env.WALLET_ADDRESS, "latest");

        const transaction = {
            to,
            value,
            gas: 21000, // 21000 em Decimal
            gasPrice, // Preço do gás obtido anteriormente
            nonce,
           // chainId: 97 // Identificador da rede Binance Smart Chain Testnet
        };

        const signedTx = await web3.eth.accounts.signTransaction(transaction, process.env.PRIVATE_KEY);

        const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log(tx.transactionHash);
    } catch (error) {
        console.error('Erro ao enviar BNB:', error);
    }
}

getBalance(process.env.WALLET_ADDRESS);

transfer("0xa63f983B44ECb7F075aE43539D36dF8053729dbE", web3.utils.toWei("0.005","ether"));
