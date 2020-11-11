import React, { Suspense } from "react";
import { useParams } from "react-router-dom";

import SpinnerLoader from "../global/SpinnerLoader/SpinnerLoader";
import InvalidSession from "./InvalidSession";

import { useSocketSession } from "../../hooks/socket";

const SliderSession = React.lazy(() => import('./SliderSession/SliderSession'));
const PowerPointSession = React.lazy(() => import('./PowerPointSession/PowerPointSession'));
const FullscreenSession = React.lazy(() => import('./FullscreenSession/FullscreenSession'));

const Session = () => {
  const { mode, id } = useParams<{ mode: string, id: string }>();

  const [isChecked, isValid] = useSocketSession(id);

  if (isChecked) {
    let component = <InvalidSession />;

    if (isValid) {
      if (mode === 's')
        component = <SliderSession sessionId={id} />;
      else if (mode === 'f')
        component = <FullscreenSession sessionId={id} />;
      else if (mode === 'pp')
        component = <PowerPointSession sessionId={id} />;
    }

    return (
      <Suspense fallback={<SpinnerLoader />}>
        {component}
      </Suspense>
    )
  }
  else {
    return <SpinnerLoader />;
  }
};

export default Session;
