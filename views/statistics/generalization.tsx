import React, { useEffect, useState, useRef, createRef } from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavLeft,
  f7ready,
  Popover,
  Subnavbar,
  Segmented,
  Tabs,
  Tab,
  Button,
  Link,
  Popup,
  View
} from "framework7-react";
import { Bar, Pie } from "react-roughviz";

const Generalization: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!!window);
  }, []);

  return (
    <Page>
      {!!show && (
        <>
          <h3>Bar</h3>
          <Bar
            title="Regions"
            data={{
              labels: ["North", "South", "East", "West"],
              values: [10, 5, 8, 3]
            }}
            // labels="flavor"
            // values="price"
          />
          <h3>Pie</h3>
          <Pie
            data={{
              labels: ["North", "South", "East", "West"],
              values: [10, 5, 8, 3]
            }}
            title="Regions"
            colors={["red", "orange", "blue", "skyblue"]}
            roughness={4}
            fillStyle="cross-hatch"
          />
        </>
      )}
    </Page>
  );
};

export default Generalization;
