// src/hooks/useWebSocket.ts
import { useEffect, useRef, useState, useCallback } from "react";
import keycloakInstance from "../services/keycloakService";
import { jwtDecode } from "jwt-decode";

type KeycloakToken = {
  sub: string;
  preferred_username?: string;
  email?: string;
  exp?: number;
  iat?: number;
};


export const useWebSocket = (url: string) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const sendMessage = useCallback((content: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const token = keycloakInstance.token;

      if (!token) return;

      const message = {
        user_id: "null",
        content: content,
        timestamp: new Date().toISOString(),  
        mtype: "message",                   
      };
      ws.current.send(JSON.stringify(message));
    }
  }, []);

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
