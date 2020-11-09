import React from "react";

import ActiveSession from "./ActiveSession";
import InvalidSession from "./InvalidSession";
import { useParams } from "react-router-dom";
import { useSocketSession } from "../../hooks/socket";

import SpinnerLoader from "../global/SpinnerLoader";

const Session = () => {
  const { id } = useParams<{ id: string }>();

  const [isChecked, isValid] = useSocketSession(id);

  if (isChecked) {
    return isValid ?
      <ActiveSession sessionId={id} /> :
      <InvalidSession />;
  }
  else {
    return <SpinnerLoader />;
  }
};

export default Session;
