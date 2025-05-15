const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// 🔹 Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blockchainDB";
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error en conexión:", error));

// 🔹 Ruta raíz
app.get("/", (req, res) => {
  res.send("🚀 Bienvenido al servidor Blockchain Militar");
});

// 🔹 Ruta para verificar estado del servidor
app.get("/api/status", (req, res) => {
  res.json({ message: "✅ Servidor corriendo correctamente" });
});

// 🔹 Modelo de documento en MongoDB
const DocumentSchema = new mongoose.Schema({
  hash: String,
  signature: String,
  timestamp: { type: Date, default: Date.now },
});
const Document = mongoose.model("Document", DocumentSchema);

// 🔹 Ruta para registrar documentos con firma digital
app.post("/api/save", async (req, res) => {
  try {
    const { hash, signature } = req.body;
    if (!hash || !signature) return res.status(400).json({ error: "❌ Hash y firma requeridos" });

    const newDoc = new Document({ hash, signature });
    await newDoc.save();
    res.json({ message: "✅ Documento registrado en Blockchain" });
  } catch (error) {
    res.status(500).json({ error: "❌ Error al guardar el documento" });
  }
});

// 🔹 Ruta para validar documentos por hash
app.post("/api/validate", async (req, res) => {
  try {
    const { hash } = req.body;
    if (!hash) return res.status(400).json({ error: "❌ Hash requerido" });

    const exists = await Document.exists({ hash });
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: "❌ Error en la validación" });
  }
});

// 🔹 Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
