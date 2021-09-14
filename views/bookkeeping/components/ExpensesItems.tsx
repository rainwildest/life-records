import React, { useState, memo } from "react";
import { Swiper, SwiperSlide } from "framework7-react";
import Icons from "components/Icons";

type Options = LivingExpensesOption & IDSQLOption;
type ExpensesItemOption = {
  data: Array<Options[]>;
  onSelected?: (val: Options) => void;
};

const ExpensesItem: React.FC<ExpensesItemOption> = ({ data, onSelected }) => {
  const [active, setActive] = useState(null);

  return (
    <Swiper
      className="demo-swiper demo-swiper-auto h-full overflow-y-auto"
      spaceBetween={10}
      slidesPerView={"auto"}
      centeredSlides
    >
      {data.map((detail: Options[], index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-4 gap-4 items-center py-3">
              {detail.map((item, index) => (
                <div
                  key={item.id}
                  className={`${
                    active === index ? "inset-shadow-3" : "shadow-3"
                  } py-2 rounded-lg flex flex-col items-center`}
                  data-index={index}
                  onClick={() => {
                    setActive(index);
                    onSelected && onSelected(item);
                  }}
                >
                  <Icons name="calendar" className="expense-icon" />
                  <p className="text-xs pt-1.5 pointer-events-none">
                    {item.expenseName}
                  </p>
                </div>
              ))}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default memo(ExpensesItem);
