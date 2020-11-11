import React, { useState, useEffect } from "react";
import { useSocket } from "../../../hooks/socket";

import "./FullscreenSession.scss";

interface Props {
  sessionId: string,
};

type Session = {
  name: string,
  imageUrls: Array<string>,
};

const FullscreenSession = (props: Props) => {
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [cursorX, setCursorX] = useState<number>(0);
  const [cursorY, setCursorY] = useState<number>(0);

  const socket = useSocket();

  useEffect(() => {
    socket.emit("init", props.sessionId);

    socket.on("install", ({ name, imageUrls }: Session) => {
      console.debug("[Socket]: Installing session", name)

      setImageUrls(imageUrls);
    });

    socket.on("selectIndex", (newSelectedIndex: number) => {
      console.debug("[Socket]: Selected index " + newSelectedIndex);

      setSelectedIndex(newSelectedIndex);
    });

    socket.on("cursorMoved", ([x, y]: Array<number>) => {
      setCursorX(x);
      setCursorY(y);

      console.log("X", x, "Y", y, "done");

    })
  }, [props.sessionId, socket]);

  return (
    <div className="fullscreen-session">
      <div className="fullscreen-session__image-book">
        {imageUrls.map(imageUrl => (
          <div className="d-none" key={imageUrl} >
            <img src={imageUrl} alt="" />
          </div>
        ))}
      </div>

      <div className="fullscreen-session__canvas-wrapper">
        <div
          className="fullscreen-session__canvas-image"
          style={{
            '--bg-image-url': 'url(\'' + imageUrls[selectedIndex] + '\')'
          } as React.CSSProperties}
        >
          <img
            src={imageUrls[selectedIndex]}
            alt=""
            draggable={false}
          />
        </div>

        <div
          className="fullscreen-session__canvas-cursor"
          style={{ left: (cursorX * 100) + "%", top: (cursorY * 100) + "%" }}
        >
          <img src="/img/cursor.png" draggable={false} width="14" />
        </div>
      </div>
    </div>
  );
};

export default FullscreenSession;
