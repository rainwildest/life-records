import React from "react";
import { Page, Navbar, Link, Swiper, SwiperSlide } from "framework7-react";

const Bookkeeping: React.FC = () => {
  return (
    <Page>
      <Link back>Back</Link>
      <div>记账页面</div>

      <Swiper>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </Page>
  );
};

export default Bookkeeping;
