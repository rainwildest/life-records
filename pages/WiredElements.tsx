import React, { Fragment, useEffect } from "react";

export default function WiredElements(): React.ReactNode {
  useEffect(() => {
    import("wired-elements");
    import("wired-elements/lib/wired-calendar");
  }, []);

  return <Fragment />;
}
