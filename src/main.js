const {Blockchain, Transaction} = require('./blockchain');

let meuDinheiro = new Blockchain();

meuDinheiro.createTransaction(new Transaction('adress1', 'adress2', 100))
meuDinheiro.createTransaction(new Transaction('adress2', 'adress1', 50))

console.log('\n Iniciando o minerador...');
//Este método espera um parâmetro de endereço, para onde deve ir a recompensa
meuDinheiro.minePendingTransactions('endereço-carlos');
//Pega o endereço da carteira de carlos e só envia a recompensa depois que minerar o próximo bloco
console.log('\nCaretira de carlos é', meuDinheiro.getBalanceOfAdress('endereço-carlos'));

console.log('\n Iniciando o minerador de novo...');
meuDinheiro.minePendingTransactions('endereço-carlos');

console.log('\nCaretira de carlos é', meuDinheiro.getBalanceOfAdress('endereço-carlos'));

//Minerar blocos
// console.log(`Minerando bloco 1...`)
// meuDinheiro.addBlock(new Block(1, "30/07/2020", {valor: 30}));

// console.log(`Minerando bloco 2...`);
// meuDinheiro.addBlock(new Block(2, "31/07/2020", {valor: 150}));


// //primeira verificação do blockchain
// console.log(`Este bloco é válido? ${meuDinheiro.isChainValid()}`); //true


// //renderiza os blocks com 4 espaços
// console.log(JSON.stringify(meuDinheiro, null, 4))


// //alterei o blockchain para burlar a checagem e verificar se acusa como Não
// //quando altera o blockchain sem usar o calcularHash, ele acusa como fraude
// meuDinheiro.chain[1].transactions = { valor: 200 };
// //Tento alterar um block logo após mudar o dinheiro para 200
// //O processo deve falhar, já que o blockchain nunca se altera, apenas adiciona novos block
// meuDinheiro.chain[1].hash = meuDinheiro.chain[1].calcularHash();

// //verifico se alterei o blockchain
// console.log(`is blockchain valid? ${meuDinheiro.isChainValid()}`); //false
// console.log(meuDinheiro.chain[2].transactions);