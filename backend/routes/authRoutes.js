const express = require("express");
const router = express.Router();

// 🔹 Ruta de autenticación
router.post("/login", (req, res) => {
  const { user, password } = req.body;

  if (user === "admin" && password === "12345") {
    res.json({ message: `✅ Bienvenido, ${user}!` });
  } else {
    res.status(401).json({ message: "❌ Credenciales incorrectas" });
  }
});

module.exports = router;
