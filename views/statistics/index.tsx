import React, { useEffect, useState, useRef, createRef } from "react";
import { Page, Navbar, NavLeft, f7ready } from "framework7-react";
import { Bar, Pie } from "react-roughviz";

const Statistics: React.FC = () => {
  const [show, setShow] = useState(false);
  const calendar = useRef();
  const textInput = useRef();
  useEffect(() => {
    setShow(!!window);

    f7ready((f7) => {
      // f7.dialog.alert("Component mounted");
      f7.calendar.create({
        inputEl: calendar.current
      });
    });
    // const button = document.querySelector("wired-calendar");
    (textInput.current as any).addEventListener("selected", (data: any) => {
      // window.alert(`Hello ${name.value.trim()}!`);
      console.log("kdjksf", data.detail);
    });
    setTimeout(() => {
      console.log(textInput.current);
    }, 1000 * 5);
  }, []);

  return (
    <Page>
      <Navbar>
        <NavLeft>
          <div ref={calendar}>sdfksdf</div>
        </NavLeft>
      </Navbar>

      <wired-button>Click Me</wired-button>
      <wired-card elevation="5">
        <h1>wired-elements demo</h1>
      </wired-card>
      <wired-calendar ref={textInput}></wired-calendar>

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
