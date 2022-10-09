const Block = require('./block');
const cryptoHash = require('./crypto-hash');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data             
        })
        this.chain.push(newBlock);
    }

    static isValidchain(chain){
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            return false;
        }
        for(let i=1; i<chain.length; i++){
            const {timestamp,prevHash,hash,data} = chain[i];
            const realLastHash = chain[i - 1].hash;

            if(prevHash !== realLastHash) return false;
            
            const validateHash = cryptoHash(timestamp, prevHash, data)
            if(hash !== validateHash) return false;
        }
        return true;
    }

}

const blockchain = new Blockchain();
blockchain.addBlock({data:"Block1"})
console.log(blockchain);

const result = Blockchain.isValidchain(blockchain.chain);
console.log(result); 
module.exports = Blockchain; 