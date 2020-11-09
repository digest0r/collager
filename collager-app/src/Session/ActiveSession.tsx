import React, { useState, useEffect } from "react";
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:3004";

const socket = io(ENDPOINT);

const ActiveSession = () => {

  const [ response, setResponse ] = useState<string>("");

  useEffect(() => {

    socket.emit('test', 'Hello test!');

    socket.on("testBack", (response: string) => {
      setResponse(response);
    });
  }, []);

  return (
    <p>ActiveSession {response}</p>
  )
};

export default ActiveSession;
