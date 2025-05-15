const crypto = require("crypto");

class Block {
    constructor(index, previousHash, docHash, signedBy, timestamp = Date.now()) {
        this.index = index;
        this.previousHash = previousHash;
        this.docHash = docHash;
        this.signedBy = signedBy;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto.createHash("sha256")
            .update(this.index + this.previousHash + this.docHash + this.signedBy + this.timestamp)
            .digest("hex");
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "0", "GENESIS", "ADMIN");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(docHash, signedBy) {
        const newBlock = new Block(this.chain.length, this.getLatestBlock().hash, docHash, signedBy);
        this.chain.push(newBlock);
        console.log(`🔗 Bloque registrado: ${newBlock.hash}`);
    }
}

module.exports = Blockchain;

