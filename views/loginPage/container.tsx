import React, { useRef, useEffect, useState } from "react";

import FormsContainer from "./FormsContainer";
import Panels from "./Panels";

const Container: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isAnimal, setIsAnimal] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setTimeout(() => {
      setIsAnimal(true);
      timer.current = null;
    }, 500);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return (
    <div
      className={`login-container${isAnimal ? " animal" : ""}`}
      ref={container}
    >
      <FormsContainer />
      <Panels container={container} />
    </div>
  );
};

export default Container;
