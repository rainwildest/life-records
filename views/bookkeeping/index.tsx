import React from "react";
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Swiper,
  SwiperSlide
} from "framework7-react";

const Bookkeeping: React.FC = () => {
  const calc = [
    { name: 1, code: 1 },
    { name: 2, code: 2 },
    { name: 3, code: 3 },
    { name: "x", code: "multiplication" },
    { name: 4, code: 4 },
    { name: 5, code: 5 },
    { name: 6, code: 6 },
    { name: "+", code: "addition" },
    { name: 7, code: 7 },
    { name: 8, code: 8 },
    { name: 9, code: 9 },
    { name: "-", code: "subtraction" },
    { name: ".", code: "point" },
    { name: 0, code: 0 },
    { name: "清空", code: "clear" },
    { name: "完成", code: "complete" }
  ];

  return (
    <Page noToolbar>
      <Navbar>
        <NavLeft>
          <Link back>Left Link</Link>
        </NavLeft>
        <NavTitle>My App</NavTitle>
        <NavRight>
          <Link>Right Link</Link>
        </NavRight>
      </Navbar>

      <Swiper
        className="demo-swiper demo-swiper-auto"
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>

      <div
        className="w-full fixed bottom-0 pt-2 px-2"
        style={{
          backgroundImage: "linear-gradient(120deg, #2193b0 , #6dd5ed)"
        }}
      >
        <div
          className="truncate py-1 px-2 rounded-lg mb-1"
          style={{ background: "white", border: "1px solid" }}
        >
          <span className="pr-3">备注</span>
          <span></span>
        </div>
        <div
          className="rounded-lg box-border flex justify-between items-center px-2"
          style={{ height: "40px", background: "white", border: "1px solid" }}
        >
          <div className="flex-shrink-0 pr-4 flex items-center">
            <div className="pr-1">日历</div>
            <div className="text-xs">2020-09-01</div>
          </div>
          <div className="truncate font-bold">0</div>
        </div>
        <div className="grid grid-cols-4 gap-1 pb-2 pt-2">
          {calc.map((item) => {
            return (
              <div
                className="text-center py-2 rounded-lg box-border font-bold"
                style={{ background: "white", border: "1px solid" }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};

export default Bookkeeping;
