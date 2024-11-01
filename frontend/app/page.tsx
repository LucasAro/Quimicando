"use client";

import { useState, useEffect } from "react";

export default function MoleculeGame() {
  const [hints, setHints] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState("");
  const [result, setResult] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch("http://localhost:3001/molecule/today", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setHints(data.hints);
          if (data.message) {
            setResult(data.message);
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar dicas da molécula:", error);
        });
    } else {
      console.error("Token não encontrado.");
    }
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setResult("Você precisa estar logado para fazer uma tentativa.");
      return;
    }

    fetch("http://localhost:3001/molecule/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ guess: userGuess, attempts }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data.message);

        if (data.success) {
          setUserGuess("");
          return;
        }

        if (data.hint && attempts < hints.length) {
          setHints((prevHints) => [...prevHints, data.hint]);
        }

        setAttempts(attempts + 1);
      });

    setUserGuess("");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl text-black font-bold mb-4">
        Jogo da Molécula do Dia
      </h1>

      {hints.length > 0 ? (
        <>
          <p className="mb-4 text-black ">
            Digite o nome da molécula com base nas dicas:
          </p>

          <div className="mb-4">
            {hints.map((hint, index) => (
              <p key={index} className="text-black  font-semibold">
                <strong>Dica {index + 1}:</strong> {hint}
              </p>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Seu palpite"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-72 mb-2 text-black"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Enviar Palpite
            </button>
          </form>

          {result && (
            <p className="mt-4 text-lg font-bold text-black">{result}</p>
          )}
        </>
      ) : (
        <p>Carregando a dica da molécula...</p>
      )}
    </div>
  );
}
