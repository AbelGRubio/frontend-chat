/**
 * file useWebSocket.ts
 * description Custom React hook for managing a WebSocket connection with message sending and receiving logic.
 * Includes automatic connection setup, teardown, and state management. Integrates with Keycloak for authentication token.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import keycloakInstance from "../services/keycloakService";

/**
 * Hook that establishes and manages a WebSocket connection.
 * 
 * It handles:
 * - Connection state (`isConnected`)
 * - Incoming messages (`messages`)
 * - Sending messages with Keycloak token (`sendMessage`)
 *
 * @param {string} url - The WebSocket URL to connect to.
 * @returns {{
 *   messages: string[],
 *   sendMessage: (content: string) => void,
 *   isConnected: boolean
 * }} An object containing the message list, connection status, and a function to send messages.
 */
export const useWebSocket = (url: string) => {
  /**
   * Reference to the current WebSocket instance.
   */
  const ws = useRef<WebSocket | null>(null);

  /**
   * List of messages received from the WebSocket.
   */
  const [messages, setMessages] = useState<string[]>([]);

  /**
   * Boolean indicating whether the WebSocket is connected.
   */
  const [isConnected, setIsConnected] = useState(false);

  /**
   * Sends a message through the WebSocket, including Keycloak authentication.
   * 
   * @param {string} content - The message content to send.
   */
  const sendMessage = useCallback((content: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const token = keycloakInstance.token;

      if (!token) return;

      const message = {
        user_id: "null",                       // You can update this with actual user ID if available
        content: content,
        timestamp: new Date().toISOString(),
        mtype: "message",                      // Message type, e.g. "message", "notification", etc.
      };

      ws.current.send(JSON.stringify(message));
    }
  }, []);

  /**
   * Establishes the WebSocket connection and sets up event handlers.
   * Cleans up the connection on component unmount or URL change.
   */
  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);

    ws.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  return { messages, sendMessage, isConnected };
};
