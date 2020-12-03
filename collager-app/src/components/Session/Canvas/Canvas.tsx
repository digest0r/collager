import React, { useState, useEffect, useCallback, MouseEvent } from "react";
import { throttle } from "lodash";
import { useSocket } from "../../../hooks/socket";

import "./Canvas.scss";

type Props = {
  imageUrl: string,
  noBackground?: boolean,
  cursorHighlighted?: boolean,
};

type Point = {
  x: number,
  y: number,
};

const Canvas = (props: Props) => {
  const [cursor, setCursor] = useState<Point>({ x: 0, y: 0 });

  const socket = useSocket();

  useEffect(() => {
    socket.on("cursorMoved", ({ x, y }: Point) => {

      setCursor({ x, y });
    })
  }, [socket]);

  const handleMouseOver = useCallback(
    throttle((e: MouseEvent) => {
      const targetEl: HTMLElement = (e.target as HTMLElement);
      const rect: DOMRect = targetEl.getBoundingClientRect();
      const x = Math.floor(e.clientX - rect.left);
      const y = Math.floor(e.clientY - rect.top);

      const xNorm = x / targetEl.offsetWidth;
      const yNorm = y / targetEl.offsetHeight;

      socket.emit('cursor', { x: xNorm, y: yNorm });
    }, 200),
    []);

  const backgroundImage = props.noBackground ? '' : 'url(\'' + props.imageUrl + '\')';
  const cursorHighlightedClass = props.cursorHighlighted ? ' canvas__cursor--highlighted' : '';

  return (
    <div
      className="canvas"
      style={{ '--bg-image-url': backgroundImage } as React.CSSProperties}
    >
      <div className="canvas__image-wrapper">
        <img
          className="canvas__image"
          src={props.imageUrl}
          alt=""
          draggable={false}
          onMouseMove={handleMouseOver}
        />

        <div
          className={'canvas__cursor' + cursorHighlightedClass}
          style={{ left: (cursor.x * 100) + "%", top: (cursor.y * 100) + "%" }}
        >
          <img
            src="/img/cursor.png"
            draggable={false}
            width="14"
          />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
