// src/components/ChatWindow.tsx
import React from 'react';
import { useState, FormEvent } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

export default function Home() {
  const [input, setInput] = useState("");

  const token = sessionStorage.getItem("token");
  const { messages, sendMessage, isConnected } = useWebSocket(
    `ws://localhost:8000/ws/messages?token=${token}`);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-lg shadow-lg p-4 bg-white h-[80vh] flex flex-col">
      <div className="text-center text-lg font-bold mb-2">
        {isConnected ? "🟢 Conectado" : "🔴 Desconectado"}
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-blue-100 rounded w-fit max-w-full">
            {msg}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Enviar
        </button>
      </form>
    </div>
  );
};
