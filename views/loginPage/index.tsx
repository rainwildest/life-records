import React from "react";

import Layout from "components/Layout";
import Container from "./container";

const Login: React.FC = () => {
  return (
    <Layout hasHeader={false}>
      <Container />
    </Layout>
  );
};

export default Login;
