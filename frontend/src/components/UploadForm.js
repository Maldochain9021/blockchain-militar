import React, { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

function UploadForm() {
  const [document, setDocument] = useState("");
  const [hash, setHash] = useState("");

  const handleEncrypt = () => {
    const hashedDoc = CryptoJS.SHA256(document).toString();
    setHash(hashedDoc);

    axios.post("http://localhost:3000/api/save", { hash: hashedDoc })
      .then(() => alert("✅ Documento registrado en Blockchain"))
      .catch(() => alert("❌ Error en el almacenamiento"));
  };

  return (
    <div>
      <h2>🔐 Protección de Datos Militares en Blockchain</h2>
      <textarea value={document} onChange={(e) => setDocument(e.target.value)} />
      <button onClick={handleEncrypt}>Cifrar y Guardar</button>
      {hash && <p>Hash generado: <b>{hash}</b></p>}
    </div>
  );
}

export default UploadForm;
