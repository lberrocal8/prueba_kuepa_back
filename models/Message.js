const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  activeUserName: String,
  role: { type: String, enum: ["Moderador", "Estudiante"], default: "Estudiante" },
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
