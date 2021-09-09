import React, { useEffect } from "react";
import Container from "./container";

interface LayoutProps {
  errorMessage?: string;
  loading?: string;
  children?: React.ReactNode;
  hasHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  hasHeader = true,
  errorMessage,
  loading = false,
  children,
  ...props
}) => {
  // /* 报错后显示的内容 */
  if (errorMessage) {
    return <Container>{errorMessage}</Container>;
  }

  return (
    <Container hasHeader={hasHeader}>
      {/* {!!loading && ()} */}
      {!loading && !errorMessage && children}
    </Container>
  );
};

export default Layout;
