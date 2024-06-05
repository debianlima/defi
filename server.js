// server.js
const express = require('express');
const Web3 = require('web3');

const app = express();
const port = process.env.PORT || 3000;

// Conectar à Binance Smart Chain
const web3 = new Web3('https://bsc-dataseed.binance.org/');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const balance = await web3.eth.getBalance(address);
        res.send({ balance: web3.utils.fromWei(balance, 'ether') });
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch balance' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
