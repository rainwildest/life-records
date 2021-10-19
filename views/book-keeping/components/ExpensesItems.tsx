import React, { useState, memo, useEffect } from "react";
import { Swiper, SwiperSlide } from "framework7-react";
import Icons from "components/Icons";

type Options = LivingExpensesOptions & DateAndIdSQLFieldOption;
type ExpensesItemOption = {
  type?: string;
  data: Array<Options[]>;
  onSelected?: (val: { [key: string]: Options }) => void;
};

const ExpensesItem: React.FC<ExpensesItemOption> = ({
  type,
  data,
  onSelected
}) => {
  const [active, setActive] = useState("0-0");

  useEffect(() => {
    const index = active.split("-");
    const info = data[index[0]][index[1]];
    onSelected && onSelected({ [type]: info });
  }, []);
  return (
    <Swiper
      className="expenses-swiper expenses-swiper-auto h-full overflow-y-auto"
      spaceBetween={10}
      slidesPerView={"auto"}
      centeredSlides
    >
      {data.map((detail: Options[], index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-4 gap-4 items-center py-3">
              {detail.map((item, subIndex) => (
                <div
                  key={item.id}
                  className={`${
                    active === `${index}-${subIndex}`
                      ? "inset-shadow-3"
                      : "shadow-3"
                  } py-2 rounded-lg flex flex-col items-center`}
                  data-index={`${index}-${subIndex}`}
                  onClick={() => {
                    setActive(`${index}-${subIndex}`);
                    onSelected && onSelected({ [type]: item });
                  }}
                >
                  <Icons
                    name="calendar"
                    className="expense-icon pointer-events-none"
                  />
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
