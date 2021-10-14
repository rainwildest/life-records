import React, { useState } from "react";
import { Page, PageContent, Link, Navbar, NavLeft } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Icons from "components/Icons";
import store from "lib/store";

const signin: React.FC<RouterOpotions> = ({ f7route, f7router }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  const onSetStatusFalse = () => {
    setIsSignUp(false);
  };
  const onSetStatusTrue = () => {
    setIsSignUp(true);
  };
  const onSuccess = (token) => {
    store.dispatch("setToken", token);

    const { to } = f7route.query;
    if (!to) return f7router.back();

    f7router.navigate(to, {
      clearPreviousHistory: true
    });
  };

  return (
    <Page noToolbar pageContent={false} className="signin-signup-page">
      <div
        className={`signup-status absolute left-1/2 transform -translate-x-1/2${
          isSignUp ? " is-signup" : ""
        }`}
      />
      <Navbar noHairline transparent className="h-14">
        <NavLeft>
          <Link className="px-4" back>
            <Icons className="signin-signup-back" name="left-arrow" />
          </Link>
        </NavLeft>
      </Navbar>
      <PageContent className="grid overflow-x-hidden">
        <SignUp
          btnText="注&emsp;册"
          isSignUp={isSignUp}
          onSignIn={onSetStatusFalse}
          onSuccess={onSuccess}
        />
        <SignIn
          btnText="登&emsp;录"
          isSignIn={!isSignUp}
          onSignUp={onSetStatusTrue}
          onSuccess={onSuccess}
        />
      </PageContent>
    </Page>
  );
};

export default signin;
