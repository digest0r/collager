import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSocket } from "../../../hooks/socket";

import "./PowerPointSession.scss";

interface Props {
  sessionId: string,
};

type Session = {
  name: string,
  imageUrls: Array<string>,
};

const PowerPointSession = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const socket = useSocket();

  useEffect(() => {
    socket.emit("init", props.sessionId);

    socket.on("install", ({ name, imageUrls }: Session) => {
      console.debug("[Socket]: Installing session", name)

      setName(name);
      setImageUrls(imageUrls);
    });

    socket.on("selectIndex", (newSelectedIndex: number) => {
      console.debug("[Socket]: Selected index " + newSelectedIndex);

      setSelectedIndex(newSelectedIndex);
    });
  }, [props.sessionId, socket]);

  const previous = () => {
    if (selectedIndex > 0) {
      select(selectedIndex + 1);
    }
  };

  const next = () => {
    if (selectedIndex < imageUrls.length - 1) {
      select(selectedIndex - 1);
    }
  };

  const select = (index: number) => {
    socket.emit('switch', index);
  };

  return (
    <div className="powerpoint-session">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="powerpoint-session-images">
              {imageUrls.map((imageUrl, index) => (
                <div
                  className={"powerpoint-session__preview-image" + (index === selectedIndex ? " powerpoint-session__preview-image--selected" : "")}
                  key={imageUrl}
                  onClick={() => select(index)}
                >
                  <div className="powerpoint-session__preview-image-index">{index + 1}</div>
                  <img src={imageUrl} alt="" draggable={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-9">
            <div className="powerpoint-session__canvas-wrapper">
              <div className="powerpoint-session__canvas-image">
                <img src={imageUrls[selectedIndex]} alt="" draggable={false} />
              </div>

              <div className="powerpoint-session__canvas-controls">
                <div className="btn-group" role="group">
                  <span className="btn-separator" />

                  <button
                    type="button"
                    className="btn"
                    onClick={previous}
                  ><FaArrowLeft size="30px" /></button>

                  <div className="powerpoint-session__canvas-controls-item px-3">
                    <span>{selectedIndex + 1} / {imageUrls.length}</span>
                  </div>

                  <button
                    type="button"
                    className="btn"
                    onClick={next}
                  ><FaArrowRight size="30px" /></button>
                </div>

                <span className="btn-separator" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerPointSession;
