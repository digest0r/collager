import { useState, useEffect } from "react";
import io from 'socket.io-client';

const PORT = process.env.PORT || 3004;
const ENDPOINT = `http://192.168.1.32:${PORT}`;

const socket = io(ENDPOINT);

interface SessionCheck {
  id: string,
  success: boolean,
};

export const useSocket = () => socket

export const useSocketSession = (sessionId: string) => {
  const [ isValid, setValid ] = useState<boolean>(false);
  const [ isChecked, setChecked ] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('sessionCheck', sessionId);

    socket.on("sessionCheck", ({ success }: SessionCheck) => {
      setChecked(true);
      setValid(success);
    });
  }, [sessionId]);

  return [ isChecked, isValid ];
};
