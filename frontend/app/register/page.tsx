"use client"; // Certifique-se de que o componente é client-side

import { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirecionar após o registro

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Para redirecionar após o registro bem-sucedido

  const handleRegister = async () => {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Registro bem-sucedido! Redirecionando para login...");

      // Redireciona para a página de login após o registro
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      setMessage(data.message || "Erro ao registrar");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Registrar</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button
        onClick={handleRegister}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Registrar
      </button>
      <p>{message}</p>
    </div>
  );
}
