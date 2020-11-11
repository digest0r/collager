import React from "react";
import { useParams } from "react-router-dom";

import SpinnerLoader from "../global/SpinnerLoader/SpinnerLoader";
import InvalidSession from "./InvalidSession";
import SliderSession from "./SliderSession/SliderSession";
import PowerPointSession from "./PowerPointSession/PowerPointSession";
import FullscreenSession from "./FullscreenSession/FullscreenSession";

import { useSocketSession } from "../../hooks/socket";

const Session = () => {
  const { mode, id } = useParams<{ mode: string, id: string }>();

  const [isChecked, isValid] = useSocketSession(id);

  if (isChecked) {
    if (isValid) {
      if (mode === 's')
        return <SliderSession sessionId={id} />;
      else if (mode === 'f')
        return <FullscreenSession sessionId={id} />;
      else if (mode === 'pp')
        return <PowerPointSession sessionId={id} />;
    }

    return <InvalidSession />;
  }
  else {
    return <SpinnerLoader />;
  }
};

export default Session;
