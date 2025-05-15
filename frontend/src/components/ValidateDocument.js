import React, { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000"; // Asegúrate de que la URL es correcta

const ValidateDocument = () => {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const handleValidate = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/validate`, { hash });
      setResult(response.data.exists ? "✅ Documento válido en Blockchain" : "❌ Documento no encontrado");
    } catch (error) {
      setResult("❌ Error en la validación");
      console.error("Error en la conexión:", error);
    }
  };

  return (
    <div>
      <h1>Validar Documento en Blockchain</h1>
      <input
        type="text"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Ingresa el hash del documento"
      />
      <button onClick={handleValidate}>Validar</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default ValidateDocument;
