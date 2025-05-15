const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    role: { type: String, enum: ["general", "soldado"], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
