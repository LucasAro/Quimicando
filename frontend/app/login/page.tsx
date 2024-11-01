"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = useState("");
  const router = useRouter(); // Para redirecionar após o login

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (data.access_token) {
      setToken(data.access_token);
      setMessage("Login successful");

      // Armazena o token no localStorage ou contexto para ser usado em outras requisições
      localStorage.setItem("token", data.access_token);

      // Redireciona para a página principal ou para o jogo
      router.push("/");
    } else {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Login</h2>
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
        onClick={handleLogin}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Login
      </button>
      <p>{message}</p>
    </div>
  );
}
