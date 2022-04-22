import React, { useState } from "react";
import { Page, Link, Navbar, NavRight, Fab } from "framework7-react";
const Games: React.FC = () => {
  const [i, setIi] = useState(null);
  const o = { l: "l", k: 0 };

  console.log({ bol: { k: "k" } });
  return (
    <Page noToolbar>
      <Navbar className="h-12" backLink></Navbar>
      <div>games</div>
    </Page>
  );
};

export default Games;
