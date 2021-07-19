import React from "react";
import SignIn from "./signIn";
import SignUp from "./signUp";

const FormsContainer: React.FC = () => {
  return (
    <div className="forms-container">
      <div className="signin-signup">
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};

export default FormsContainer;
