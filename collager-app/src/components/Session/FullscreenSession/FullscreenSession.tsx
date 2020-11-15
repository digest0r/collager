import React, { useState, useEffect } from "react";
import { useSocket } from "../../../hooks/socket";
import Canvas from "../Canvas/Canvas";

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

      <Canvas
        imageUrl={imageUrls[selectedIndex]}
      />
    </div>
  );
};

export default FullscreenSession;
