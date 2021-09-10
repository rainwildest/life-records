import React, { memo } from "react";
import { Swiper, SwiperSlide } from "framework7-react";

type Options = LivingExpensesOption & IDSQLOption;
type ExpensesItemOption = {
  data: Array<Options[]>;
  onSelected?: (val: Options) => void;
};

const ExpensesItem: React.FC<ExpensesItemOption> = ({ data, onSelected }) => {
  return (
    <Swiper
      className="demo-swiper demo-swiper-auto"
      spaceBetween={10}
      slidesPerView={"auto"}
      centeredSlides
    >
      {data.map((detail: Options[], index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-4 gap-4">
              {detail.map((item) => (
                <wired-card
                  key={item.id}
                  elevation="2"
                  class="text-center font-bold py-4"
                  onClick={() => onSelected && onSelected(item)}
                >
                  {item.expenseName}
                </wired-card>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default memo(ExpensesItem);
