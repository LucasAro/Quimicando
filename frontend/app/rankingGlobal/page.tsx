"use client";

import { useEffect, useState } from "react";

interface Ranking {
  rank: number;
  username: string;
  score: number;
}

export default function Rankings() {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  useEffect(() => {
    // Chama o endpoint do backend para buscar o ranking global
    fetch("http://localhost:3001/rankings")
      .then((response) => response.json())
      .then((data) => setRankings(data))
      .catch((error) => console.error("Erro ao carregar o ranking:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ranking Global</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Posição</th>
            <th className="border px-4 py-2">Usuário</th>
            <th className="border px-4 py-2">Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((user) => (
            <tr key={user.rank}>
              <td className="border px-4 py-2 text-center">{user.rank}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2 text-center">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
