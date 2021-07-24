import React, { Fragment } from "react";
import Icons from "components/Icons";
type EmptyProps = {
  children: React.ReactNode;
};
const Empty: React.FC<EmptyProps> = ({ children }) => {
  return (
    <Fragment>
      <Icons name="cry" className="empty-icon" />
      {children}
    </Fragment>
  );
};

export default Empty;
