import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Toggle from "components/toggle";

import { BsFillPersonFill, BsFillLockFill } from "react-icons/bs";
const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
    }
  }
`;

const k: test = {};
console.log(k);

const Index = () => {
  // const router = useRouter();
  // const { data, loading, error } = useQuery(ViewerQuery);
  // const viewer = data?.viewer;
  // const shouldRedirect = !(loading || error || viewer);

  // useEffect(() => {
  //   if (shouldRedirect) {
  //     router.push('/signin');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [ shouldRedirect ]);

  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  // if (viewer) {
  //   return (
  //     <div>
  //       You're signed in as {viewer.email} goto{' '}
  //       <Link href="/about">
  //         <a>about</a>
  //       </Link>{' '}
  //       page. or{' '}
  //       <Link href="/signout">
  //         <a>signout</a>
  //       </Link>
  //     </div>
  //   );
  // }
  const k = useRef(null);
  useEffect(() => {
    console.log(k);
  }, []);

  return (
    <>
      {/* <p>Loading...</p>
      <Toggle 
        ref={k} 
        // disabled
        // defaultChecked
        // color='black'
      />
      <Link href='/about'>
        <a >nihao</a>
      </Link> */}
      <img src="/images/bg.png" alt="" className="wave" />
      <div className="container">
        <div className="img">
          <img src="/images/social_update.svg" alt="" />
        </div>
        <div className="login-box">
          <form action="">
            <img src="/images/avatar.svg" alt="" className="avatar" />
            <h2>Welcome</h2>
            <div className="input-group">
              <div className="icon">
                <BsFillPersonFill />
              </div>
              <div>
                <h5>Username</h5>
                <input type="text" className="input" />
              </div>
            </div>

            <div className="input-group">
              <div className="icon">
                <BsFillLockFill />
              </div>
              <div>
                <h5>Password</h5>
                <input type="password" className="input" />
              </div>
            </div>
            <a href="#">Forgot PassWord</a>
            <button type="submit" className="btn">
              {" "}
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Index;
