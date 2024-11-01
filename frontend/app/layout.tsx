"use client";

import localFont from "next/font/local";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./globals.css";

// Remova a exportação do `metadata` para evitar o erro

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUsername(payload.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do local storage
    setUsername(null); // Reseta o username
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex flex-col`}
      >
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Quimicando</h1>
            <div>
              {username ? (
                <>
                  <span className="text-lg font-semibold">
                    Olá, {username}!
                  </span>
                  <Link href="/rankingGlobal">
                    <button className="text-white bg-yellow-500 hover:bg-yellow-700 font-semibold py-2 px-4 rounded-md ml-4">
                      Ranking
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-red-500 hover:bg-red-700 font-semibold py-2 px-4 rounded-md ml-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-md mr-2">
                      Login
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="text-white bg-green-500 hover:bg-green-700 font-semibold py-2 px-4 rounded-md">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto text-center">
            <p className="text-sm">
              &copy; 2024 Lucas Rodrigues. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
