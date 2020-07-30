//Biblioteca que ajuda a produzir public e private key
//com metodos para cadasrto e verificar assinaturas
//npm install eliptic
const EC = require('elliptic').ec;
//cria uma instância do algoritmo que é base das carteiras bitcoin
const ec = new EC('secp256k1');

//gera uma chave que vira assinatura para transações
const key = ec.genKeyPair();
const publickey = key.getPublic('hex');
const privatekey = key.getPrivate('hex');

console.log();
console.log('Chave privada é: ', privatekey);

console.log();
console.log('Chave pública é: ', publickey);