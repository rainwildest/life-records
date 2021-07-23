import React, { useEffect, useState } from "react";
import { Page } from "framework7-react";
import { Bar, Pie, StackedBar } from "react-roughviz";

const Statistics: React.FC = () => {
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

export default Statistics;
