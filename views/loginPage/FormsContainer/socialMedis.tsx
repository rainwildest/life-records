import React, { ReactNode } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

import NextLink from "next/link";

const SocialMedis: React.FC = () => {
  return (
    <fieldset className="social-text-field">
      <legend>或者社交平台登录</legend>

      <div className="social-medis">
        <NextLink href="/api/oauth/github">
          <a href="#" className="social-icon">
            <FaGithub />
          </a>
        </NextLink>
        {/* <a href='#' className='social-icon'>
              <FaTwitter />
            </a> */}
        <NextLink href="/api/oauth/google">
          <a href="#" className="social-icon">
            <FaGoogle />
          </a>
        </NextLink>
        {/* <a href='#' className='social-icon'>
              <FaLinkedinIn />
            </a> */}
      </div>
    </fieldset>
  );
};

export default SocialMedis;
