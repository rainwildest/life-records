import React, { useState } from "react";
import {
  f7,
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter
} from "framework7-react";
import request from "lib/api/request";

const Login: React.FC = () => {
  const [username, setUsername] = useState("rainwildest@163.com");
  const [password, setPassword] = useState("12345678");
  const signIn = () => {
    const md5 = require("md5");

    request({
      url: "/api/auth/signIn",
      method: "POST",
      data: JSON.stringify({
        email: username.trim(),
        password: md5(password.trim())
        // username: "kjkk"
      })
    })
      .then((val) => {
        console.log(val);
      })
      .catch((error) => {
        console.log(error);
      });
    // 验证用户信息
    // fetch("/api/auth/signIn", {
    //   signal: controller.signal,
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     email: username.trim(),
    //     password: md5(password.trim())
    //   })
    // })
    //   .then(async (states) => {
    //     console.log(states?.json());
    //   })
    //   .catch((err) => {
    //     console.log("> error:", err);
    //     // setSubmitting(false);
    //   });
  };

  return (
    <Page loginScreen>
      <LoginScreenTitle>Framework7</LoginScreenTitle>
      <List form>
        <ListInput
          label="email"
          type="text"
          placeholder="Your email"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <List>
        <ListButton onClick={signIn}>Sign In</ListButton>
        <BlockFooter>
          Some text about login information.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </BlockFooter>
      </List>
    </Page>
  );
};

export default Login;

export const getServerSideProps = async ({ req, res, query }) => {
  console.log(
    "login============================================================================="
  );
  return {
    props: {}
  };
};
