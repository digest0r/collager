import React, { useState, useEffect } from "react";
import Slick from "react-slick";
import { FaImage, FaInfoCircle, FaArrowLeft, FaArrowRight, FaEye, FaExpand } from "react-icons/fa";
import { useSocket } from "../../../hooks/socket";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderSession.scss";

interface Props {
  sessionId: string,
};

type Session = {
  name: string,
  imageUrls: Array<string>,
};

const SliderSession = (props: Props) => {
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slider, setSlider] = useState<any>(null);

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
      slider?.slickGoTo(newSelectedIndex);
    });
  }, [props.sessionId, socket, slider]);

  const previous = () => {
    if (currentIndex > 0) {
      slider?.slickGoTo(currentIndex - 1);
    }
  };

  const next = () => {
    if (currentIndex < imageUrls.length - 1) {
      slider?.slickGoTo(currentIndex + 1);
    }
  };

  const select = () => {
    if (selectedIndex === currentIndex)
      return;

    socket.emit('switch', currentIndex);
  };

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (currentIndex: number) => setCurrentIndex(currentIndex),
  };

  return (
    <div className="active-session">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="control-panel">
              <Slick ref={c => setSlider(c)} {...settings}>
                {imageUrls.map((imageUrl, index) => (
                  <div
                    className={"control-panel__slide" + (index === selectedIndex ? " control-panel__slide--selected" : "")}
                    key={imageUrl}
                  >
                    <img src={imageUrl} alt="" />
                  </div>
                ))}
              </Slick>

              <div className="control-panel-status">
                <div className="control-panel-status__current">
                  <span><FaImage /> {currentIndex + 1} / {imageUrls.length}</span>
                </div>

                <div className="control-panel-status__selected">
                  <FaInfoCircle /> {selectedIndex + 1}
                </div>
              </div>

              <div className="control-panel-controls">
                <button className="btn btn-primary w-25 mr-2" onClick={() => previous()}>
                  <FaArrowLeft />
                </button>

                <div className="btn-group w-100" role="group">
                  <button type="button" className="btn btn-success w-100 button-select" onClick={() => select()}>
                    <FaEye />
                    <span>Select</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-success"
                    title="Fullscreen"
                  >
                    <FaExpand />
                  </button>
                </div>

                <button className="btn btn-primary w-25 ml-2" onClick={() => next()}>
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderSession;
