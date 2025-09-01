/**
 * file Home.tsx
 * description React component that renders a basic real-time chat interface.
 * It connects to a WebSocket server using a custom hook and allows sending/receiving text messages.
 */

import React, { useState, FormEvent } from "react";
import { useWebSocket } from "../hooks/useWebSocket";

/**
 * `Home` component (chat window) that allows the user to send and receive messages over WebSocket.
 *
 * It displays a connection status indicator, the chat history, and an input field for sending new messages.
 *
 * @returns {JSX.Element} The rendered chat UI.
 */
export default function Home() {
  /**
   * The current value of the message input field.
   */
  const [input, setInput] = useState("");

  /**
   * Token used for authenticating the WebSocket connection.
   * Retrieved from sessionStorage (previously set during login).
   */
  const token = sessionStorage.getItem("token");
  const wsUrl = `${import.meta.env.VITE_API_URL}?token=${token}`;
  console.log(wsUrl);
  /**
   * WebSocket connection and messaging state.
   * - `messages`: list of received messages
   * - `sendMessage`: function to send a new message
   * - `isConnected`: WebSocket connection status
   */
  const { messages, sendMessage, isConnected } = useWebSocket(wsUrl);

  /**
   * Handles form submission to send a message.
   * Clears the input after sending.
   *
   * @param {FormEvent} e - The form submit event.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 border rounded-lg shadow-lg p-4 bg-white h-[80vh] flex flex-col">
      {/* Connection status indicator */}
      <div className="text-center text-lg font-bold mb-2">
        {isConnected ? "🟢 Conectado" : "🔴 Desconectado"}
      </div>

      {/* Message history container */}
      <div className="flex-1 overflow-y-auto space-y-2 border p-2 rounded bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-2 bg-blue-100 rounded w-fit max-w-full">
            {msg}
          </div>
        ))}
      </div>

      {/* Message input form */}
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
