import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>🚀 Bienvenido a la Plataforma Blockchain Militar</h1>
      <Link to="/upload">📂 Subir Documento</Link>
      <Link to="/validate">🔍 Validar Documento</Link>
    </div>
  );
}

export default Home;
