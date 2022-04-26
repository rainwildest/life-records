import React from "react";
// import Header from 'components/Header'

interface ContainerProps {
  children: React.ReactNode;
  hasHeader?: boolean;
  user?: any;
}

const Container: React.FC<ContainerProps> = ({ user, hasHeader = false, children, ...props }) => {
  return (
    <div className="layout h-screen flex items-center">
      {/* {!!hasHeader && <Header user={user} />} */}
      {!hasHeader && children}
      {!!hasHeader && (
        <div {...props} className="layout-container">
          {children}
        </div>
      )}
    </div>
  );
};

export default Container;
