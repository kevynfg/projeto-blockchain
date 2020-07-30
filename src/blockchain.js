const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(fromAdress, toAdress, value){
        this.fromAdress = fromAdress;
        this.toAdress = toAdress;
        this.value = value;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calcularHash();
        this.nonce = 0; //único valor que pode ser alterado, serve de incrementador
        //no método minerarBlock
    }

    //rodar npm install --save crypto-js
    //biblioteca de Hash functions para javascript
    //Este metodo adiciona uma Hash para o block
    calcularHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    minerarBlock(difficulty){
        //Inicia a string Hash do inicio até difficulty e vai demorar o quanto precisar para verifica se ela não é igual a todos os 0's de substring com o Array
        //cria um array de 0's com o mesmo tamanho de "difficulty", pois com substring, ele verifica 6 
        //logo o array precisa ser difficulty + 1 para se tornar 6
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
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
        //difficulty 2 vai ditar quantos zeros vai começar nossa Hash
        //e quanto tempo vai demorar pra minerar
        this.difficulty = 2;
        //pendinTransactions são blocos que foram minerado mas não computados, pois só podem ser computados num intervalo de 10 minutos
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    //Um genesis block é o primeiro block de uma blockchain
    createGenesisBlock(){
        return new Block("01/01/2020", "Genesis block", "0");
    }

    //Retorna o último elemento do blockchain
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    //Pega a recompensa e envia para o parâmetro especificado
    minePendingTransactions(miningRewardAdress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.minerarBlock(this.difficulty);

        console.log('Bloco minerado com sucesso!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAdress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAdress(adress){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAdress === adress){
                    balance -= trans.value;
                }

                if(trans.toAdress === adress){
                    balance += trans.value;
                }
            }
        }

        return balance;
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

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;