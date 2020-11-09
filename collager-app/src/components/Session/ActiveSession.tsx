import React, { useState, useEffect } from "react";
import Slick from "react-slick";
import { FaImage, FaInfoCircle, FaArrowLeft, FaArrowRight, FaEye, FaExpand } from "react-icons/fa";
import { useSocket } from "../../hooks/socket";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ActiveSession.scss";

interface Props {
  sessionId: string,
};

type Session = {
  name: string,
  imageUrls: Array<string>,
};

const ActiveSession = (props: Props) => {
  const [name, setName] = useState<string>("");
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);
  const [selectedIndex, setSelectedIndex ] = useState<number>(0);
  const [slider, setSlider] = useState<any>(null);

  const socket = useSocket();

  useEffect(() => {
    socket.emit("init", props.sessionId);

    socket.on("install", ({ name, imageUrls }: Session) => {
      console.debug("[Socket]: Installing session", name)

      setName(name);
      setImageUrls(imageUrls);
    });
  }, [props.sessionId, socket]);

  const selectIndex = (index: number) => {
      console.debug("[Socket]: Selected index " + index);

      setSelectedIndex(index);
      slider?.slickGoTo(index);
  };

  const previous = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const next = () => {
    if (selectedIndex < imageUrls.length - 1 ) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (currentIndex: number) => setSelectedIndex(currentIndex),
  };

  const slickClass = 'control-panel__slide'; // TODO add selected class

  return (
    <div className="active-session">
      <div className="container d-sm-none">
        <div className="row">
          <div className="col">
            <h1 className="text-center my-3">{name}</h1>
          </div>
        </div>

        <hr />
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="control-panel">
              <Slick ref={c => setSlider(c)} {...settings}>
                {imageUrls.map(imageUrl => (
                  <div className={slickClass} key={imageUrl}>
                    <img src={imageUrl} alt="" />
                  </div>
                ))}
              </Slick>

              <div className="control-panel-status">
                <div className="control-panel-status__current">
                  <span><FaImage /> {selectedIndex + 1} / {imageUrls.length}</span>
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
                  <button type="button" className="btn btn-success w-100 button-select" onClick={() => selectIndex(selectedIndex)}>
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

export default ActiveSession;
