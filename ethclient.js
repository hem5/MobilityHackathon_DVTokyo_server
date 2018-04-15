'use strict';

const EthClient = function() {
};
const ethclient = new EthClient();


const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const InfuraURL = "https://rinkeby.infura.io/CPJOZqFCV8WOx1zOCRXg";
const AddressContract = "0xf2F265c6c9c8232a08B55EF82D1ECEeD9347b9E3";
const myAddress = "0xd7049ea6f47ef848c0ad570dba618a9f6e4eb25c";
const privateKey = new Buffer('f87a0dbbf12c4efe8a4f1d2f0cf551206b3c13730372a4828cfa58c50ec1e76b', 'hex')
const carOwnerAddress = "0xE698859f316BB707e455F6799207338a50699A16";

let web3 = new Web3(new Web3.providers.HttpProvider(InfuraURL));
const compiledToken = require('./contract/build/contracts/CustomToken');
let contract = new web3.eth.Contract(compiledToken.abi, AddressContract);
contract.options.from = myAddress;
const bytecode = contract.methods.transfer(carOwnerAddress, "1000000000000000000").encodeABI();

let txExec = (nonce) => {
    const rawTx = {
        nonce: nonce,
        gasPrice: '0x86796CC',
        gasLimit: '0x2DC6C0',
        to: AddressContract,
        value: '0x00',
        data: bytecode
    };

    let tx = new Tx(rawTx);
    tx.sign(privateKey);

    let serializedTx = tx.serialize();

    console.log('0x' + serializedTx.toString('hex'));
    return new Promise((resolve, reject) => {
        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then((response) => {
            console.log("success");
            console.log(response);
            resolve(response);
        }).catch((error) => {
            console.log("error");
            reject(error);
        });
    });
};

let getNonce = () => {
    return web3.eth.getTransactionCount(myAddress);
};

EthClient.prototype.exec = () => {
    getNonce().then((nonce) => {
        txExec(nonce);
    }).catch((err) => {
        console.log("detect error!");
        console.log(err);
    });
};

module.exports = ethclient;

