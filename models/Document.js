const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    docHash: { type: String, required: true },
    signedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Document", DocumentSchema);
