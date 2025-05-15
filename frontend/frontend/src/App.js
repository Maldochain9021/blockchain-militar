import React, { useState } from "react";
import axios from "axios";
import Web3 from "web3";
import "./App.css";

const BACKEND_URL = "http://localhost:3000";

function App() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [hash, setHash] = useState("");
  const [result, setResult] = useState(null);

  const handleLogin = () => {
    alert(`Bienvenido, ${user}!`);
  };

  const validateDocument = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/validate`, { hash });
      setResult(response.data.exists ? "✅ Documento válido en Blockchain" : "❌ Documento no encontrado");
    } catch (error) {
      setResult("❌ Error en la validación");
    }
  };

  const signDocument = async () => {
    if (typeof window.ethereum !== "undefined") {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      const signature = await web3.eth.personal.sign(hash, accounts[0]);
      alert("✍️ Documento firmado correctamente.");
    } else {
      alert("❌ MetaMask no está instalado.");
    }
  };

  return (
    <div className="App">
      <h2>Blockchain Militar SecureAccess</h2>
      <p>Bienvenido al sistema de firma y validación de documentos</p>

      <input type="text" placeholder="Usuario o Administrador" value={user} onChange={(e) => setUser(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Ingresar</button>

      <h3>Validar o Firmar Documento</h3>
      <input type="text" placeholder="Hash del documento" value={hash} onChange={(e) => setHash(e.target.value)} />
      <button onClick={validateDocument}>Validar Documento</button>
      <button onClick={signDocument}>Firmar Documento</button>

      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
