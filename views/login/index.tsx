import React, { useState } from "react";
import {
  f7,
  Page,
  PageContent,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  Button,
  Link,
  Navbar,
  NavLeft
} from "framework7-react";
import request from "lib/api/request";
import ThirdParty from "./components/ThirdParty";
import Field from "./components/Field";
import Icons from "components/Icons";

const Login: React.FC = () => {
  const [username, setUsername] = useState("rainwildest@163.com");
  const [password, setPassword] = useState("12345678");
  const [isSignUp, setIsSignUp] = useState(false);
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
  };

  return (
    <Page pageContent={false} className="login-page">
      <div
        className={`signup-status absolute left-1/2 transform -translate-x-1/2${
          isSignUp ? " is-signup" : ""
        }`}
      />
      <Navbar noHairline transparent className="h-14">
        <NavLeft>
          <Link className="px-4" back>
            <Icons className="login-back" name="left-arrow" />
          </Link>
        </NavLeft>
      </Navbar>
      <PageContent className="grid">
        <div className="login-content flex flex-col justify-center items-center mt-10">
          <section className="login-container relative mb-5">
            <div className="login-avatar rounded-full overflow-hidden absolute flex justify-center items-center left-1/2 transform -translate-x-1/2 z-50">
              <Icons name="avatar-05" />
            </div>

            <div className="input-container absolute text-sm left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
              <Field label="邮&nbsp;箱" value="rainwildest@163.com" clear />
              <Field
                label="密&nbsp;码"
                type="password"
                value="12345678"
                clear
              />

              <div className="text-center mt-6 text-xs">
                <Link className="text-gray-500" href="/tabs/">
                  忘记密码？(〃'▽'〃)
                </Link>
              </div>
            </div>

            <div className="outer w-full h-full relative">
              <Button
                className="login-btn absolute left-2/4 transform -translate-x-2/4 w-32"
                raised
                fill
                round
                color="black"
              >
                登&emsp;录
              </Button>
            </div>
          </section>

          <Button
            className="login-btn w-32"
            round
            color="black"
            onClick={() => {
              setIsSignUp(!isSignUp);
            }}
          >
            注&ensp;册
          </Button>

          <ThirdParty />
        </div>
      </PageContent>
      {/* <LoginScreenTitle>Framework7</LoginScreenTitle>
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
      </List> */}
    </Page>
  );
};

export default Login;
