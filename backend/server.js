const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Middleware para ajustar la política de seguridad de contenido (CSP)
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'");
  next();
});

// 🔹 Middleware de prueba para verificar si Express está procesando solicitudes
app.use((req, res, next) => {
  console.log(`📌 Middleware activo: ${req.method} ${req.url}`);
  next();
});

// 🔹 Importar rutas de autenticación
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);
console.log("🔹 authRoutes ha sido registrado correctamente.");

// 🔹 Ruta de prueba para validar que Express está funcionando
app.get("/test-route", (req, res) => {
  res.send("✅ Ruta de prueba activa");
});

// 🔹 Ruta para verificar estado del servidor
app.get("/api/status", (req, res) => {
  res.json({ message: "✅ Servidor corriendo correctamente" });
});

// 🔹 Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

  // 🔹 Verificar middleware y rutas activas después de iniciar el servidor
  if (app._router && Array.isArray(app._router.stack)) {
    console.log(`🔍 Middleware registrado: ${app._router.stack.length}`);

    const rutas = app._router.stack.filter(m => m.route).map(m => m.route.path);
    if (rutas.length) {
      console.log("🔍 Rutas registradas en el servidor:");
      rutas.forEach(ruta => console.log(`➡️ Ruta activa: ${ruta}`));
    } else {
      console.log("⚠️ No se encontraron rutas activas. Revisa `authRoutes.js`.");
    }
  } else {
    console.log("❌ Error: Express aún no ha inicializado las rutas correctamente.");
  }
});
