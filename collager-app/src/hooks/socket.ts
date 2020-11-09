import { useState, useEffect } from "react";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3004";

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
  }, []);

  return [ isChecked, isValid ];
};
