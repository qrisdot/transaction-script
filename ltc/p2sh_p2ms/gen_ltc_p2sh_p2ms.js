//litecoin
//multisig address 2 of 2
// legacy :2xxx[196], segwit: Qxxxx[58]


const bitcoin = require('bitcoinjs-lib')
const explorers = require('litecore-explorers')
const util = require('util')
const FEE = 100000
let litecore = explorers.litecore
     //network_litecoin_testnet
const　ltc_testnet　=　{
　　　　messagePrefix:　'\x19Litecoin　Signed　Message:\n',
　　　　bip32:　{　//　tpub,　tprv
　　　　　　public:　0x043587cf,
　　　　　　private: 0x04358394
　　　　},
　　　　pubKeyHash:　0x6f,
　　　　scriptHash:　0xc4,　//2 start address
　　　　wif:　0xef
}

keys=[
'cU39grwS4qnPy3aucTSqq3bdduJacNf5bfCo9ThsWgFToVuk54vJ',
'cPFij267aAFsv1VaPtDEBUBBpeFf81GVaaW9ZG7nqpodNKpf4JqQ'
]
const keyPairs = [
    bitcoin.ECPair.fromWIF(keys[0], ltc_testnet),
    bitcoin.ECPair.fromWIF(keys[1], ltc_testnet)
]
const pubkeys = keyPairs.map(x => x.publicKey)
const p2ms = bitcoin.payments.p2ms({ m: 2, pubkeys: pubkeys, network: ltc_testnet })
const p2sh = bitcoin.payments.p2sh({ redeem: p2ms, network: ltc_testnet })


let buffer = bitcoin.address.fromBase58Check(p2sh.address)
let segwitAddress = new litecore.Address(buffer.hash, 'testnet', 'scripthash').toString()
console.log(p2sh.address, segwitAddress)

