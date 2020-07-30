const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calcularHash();
        this.nonce = 0; //único valor que pode ser alterado, serve de incrementador
        //no método minerarBlock
    }

    //rodar npm install --save crypto-js
    //biblioteca de Hash functions para javascript
    //Este metodo adiciona uma Hash para o block
    calcularHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    minerarBlock(dificuldade){
        //Inicia a string Hash do inicio até dificuldade e vai demorar o quanto precisar para verifica se ela não é igual a todos os 0's de substring com o Array
        //cria um array de 0's com o mesmo tamanho de "dificuldade", pois com substring, ele verifica 6 
        //logo o array precisa ser dificuldade + 1 para se tornar 6
        while(this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join("0")){
            this.nonce++; //incrementa até o Hash não começar com 0's o suficiente
            this.hash = this.calcularHash();
            //Só ative este console log caso queira ver como funciona a comparação
            // console.log(this.hash)
        }

        console.log(`Block minerado:  ${this.hash}`);
    }
}

class Blockchain{
    constructor(){
        //Cria o bloco genesis, o primeiro bloco da chain num array
        this.chain = [this.createGenesisBlock()];
        //dificuldade 2 vai ditar quantos zeros vai começar nossa Hash
        //e quanto tempo vai demorar pra minerar
        this.dificuldade = 5;
    }

    //Um genesis block é o primeiro block de uma blockchain
    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis block", "0");
    }

    //Retorna o último elemento do blockchain
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //O ultimo block se transforma no atual block
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        //sempre que mudar o blockchain, o calcularHash deve mudar também
        // newBlock.hash = newBlock.calcularHash();
        //Minera o bloco, passando o nível de dificuldade no parâmetro
        newBlock.minerarBlock(this.dificuldade);
        //adiciona o novo block na blockchain com push
        this.chain.push(newBlock);
    }

    //Não começar a verificação do block pelo 0, pois o genesisblock
    //é o block de criação da blockchain
    isChainValid(){
        //roda pelas blocks da chain
        for(let i = 1; i < this.chain.length; i++){
            //blocks atuais
            const currentBlock = this.chain[i];
            //blocks antigas
            const previousBlock = this.chain[i-1]
            //se o block atual não for igual ao calculo, está errado
            if(currentBlock.hash !== currentBlock.calcularHash()){
                return 'Não'
            }
            //verifica se o bloco anterior não é igual ao que era atual
            if(currentBlock.previousHash !== previousBlock.hash){
                return 'Não'
            }
        }

        return 'Sim'
    }
}

let meuDinheiro = new Blockchain();



//Minerar blocos
console.log(`Minerando bloco 1...`)
meuDinheiro.addBlock(new Block(1, "30/07/2020", {valor: 30}));

console.log(`Minerando bloco 2...`);
meuDinheiro.addBlock(new Block(2, "31/07/2020", {valor: 150}));


// //primeira verificação do blockchain
// console.log(`Este bloco é válido? ${meuDinheiro.isChainValid()}`); //true


// //renderiza os blocks com 4 espaços
// console.log(JSON.stringify(meuDinheiro, null, 4))


// //alterei o blockchain para burlar a checagem e verificar se acusa como Não
// //quando altera o blockchain sem usar o calcularHash, ele acusa como fraude
// meuDinheiro.chain[1].data = { valor: 200 };
// //Tento alterar um block logo após mudar o dinheiro para 200
// //O processo deve falhar, já que o blockchain nunca se altera, apenas adiciona novos block
// meuDinheiro.chain[1].hash = meuDinheiro.chain[1].calcularHash();

// //verifico se alterei o blockchain
// console.log(`is blockchain valid? ${meuDinheiro.isChainValid()}`); //false
// console.log(meuDinheiro.chain[2].data);