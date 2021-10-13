import React, { memo } from "react";
import { Button } from "framework7-react";
import Icons from "components/Icons";

const ThirdParty: React.FC = () => {
  return (
    <fieldset className="w-64 text-center border-t border-gray-600 mt-8">
      <legend className="px-3 text-sm text-gray-600">第三方登录</legend>
      <div className="third-party mt-3">
        <Button
          color="black"
          className="inline-flex p-0 rounded-full w-10 h-10 items-center justify-center"
          onClick={() => {
            location.href = "/api/oauth/github";
          }}
        >
          <Icons name="github" />
        </Button>

        <Button
          color="black"
          className="inline-flex p-0 rounded-full w-10 h-10 items-center justify-center ml-5"
          onClick={() => {
            location.href = "/api/oauth/google";
          }}
        >
          <Icons name="google" />
        </Button>
      </div>
    </fieldset>
  );
};

export default memo(ThirdParty);
