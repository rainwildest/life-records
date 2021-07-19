import React from "react";

type PanelsProps = {
  container: any;
};

const Panels: React.FC<PanelsProps> = ({ container }) => {
  return (
    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">
          <h3>从记录开始</h3>
          <p className="panel-text">
            世界上第一种计算机高级语言是诞生于1954年的FORTRAN语言。之后出现了多种计算机高级语言。1970年，AT&T的Bell实验室的D.Ritchie和K.Thompson共同发明了C语言。研制C语言的初衷是用它编写UNIX系统程序，因此，它实际上是UNIX的“副产品”。它充分结合了汇编语言和高级语言的优点，高效而灵活，又容易移植。
          </p>
          <button
            className="btn"
            onClick={() => {
              if (container.current) {
                container.current.classList.add("sign-up-mode");
              }
            }}
          >
            注&emsp;册
          </button>
        </div>

        <img src="svg/log.svg" className="image" alt="" />
      </div>

      <div className="panel right-panel">
        <div className="content">
          <h3>记录新的开始</h3>
          <p className="panel-text">
            1979年，Bjame Sgoustrup到了Bell实验室，开始从事将C改良为带类的C（C with
            classes）的工作。1983年该语言被正式命名为C++。自从C++被发明以来，它经历了3次主要的修订，每一次修订都为C++增加了新的特征并作了一些修改。第一次修订是在1985年，第二次修订是在1990年，而第三次修订发生在c++的标准化过程中。在20世纪90年代早期，人们开始为C++建立一个标准，并成立了一个ANSI和ISO（Intemational
            Standards
            Organization）国际标准化组织的联合标准化委员会。该委员会在1994年1月25曰提出了第一个标准化草案。在这个草案中，委员会在保持Stroustrup最初定义的所有特征的同时，还增加了一些新的特征。
          </p>
          <button
            className="btn transparent"
            onClick={() => {
              if (container.current) {
                container.current.classList.remove("sign-up-mode");
              }
            }}
          >
            登&emsp;录
          </button>
        </div>

        <img src="svg/register.svg" className="image" alt="" />
      </div>
    </div>
  );
};

export default Panels;
