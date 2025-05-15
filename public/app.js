import React, { useState } from "react";
import axios from "axios";
import Web3 from "web3";

const BACKEND_URL = "http://localhost:3000";

const App = () => {
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  // 🔹 Función para firmar documentos con MetaMask
  const signMilitaryDocument = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const signature = await web3.eth.personal.sign(hash, accounts[0]);

      console.log("✍️ Firma digital:", signature);
      return signature;
    } else {
      alert("❌ MetaMask no está instalado.");
      return null;
    }
  };

  // 🔹 Función para enviar el documento firmado al backend
  const handleSignAndUpload = async () => {
    if (!hash) return alert("❌ Ingresa un hash válido.");

    const signature = await signMilitaryDocument();
    if (!signature) return alert("❌ No se pudo firmar el documento.");

    try {
      const response = await axios.post(`${BACKEND_URL}/api/save`, { hash, signature });
      setResult(response.data.message);
    } catch (error) {
      setResult("❌ Error al registrar el documento.");
      console.error("Error:", error);
    }
  };

  // 🔹 Función para validar documentos en Blockchain
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
      <h1>Validar y Firmar Documento en Blockchain</h1>
      <input
        type="text"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Ingresa el hash del documento"
      />
      <button onClick={handleSignAndUpload}>Firmar y Guardar</button>
      <button onClick={handleValidate}>Validar</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default App;
