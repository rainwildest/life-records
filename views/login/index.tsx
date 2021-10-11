import React, { useState } from "react";
import { Page, PageContent, Link, Navbar, NavLeft } from "framework7-react";
import SignIn from "./components/SignIn";
import Icons from "components/Icons";

const signin: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Page pageContent={false} className="signin-signup-page">
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
      <PageContent className="grid">
        <SignIn
          onSignUp={() => {
            setIsSignUp(!isSignUp);
          }}
        />
      </PageContent>
      {/* <signinScreenTitle>Framework7</signinScreenTitle>
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
          Some text about signin information.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </BlockFooter>
      </List> */}
    </Page>
  );
};

export default signin;
