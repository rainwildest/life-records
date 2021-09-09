import React, { useEffect, useRef, useState, Fragment, memo } from "react";
import { format } from "lib/api/utils";
import { Swiper, SwiperSlide, f7ready } from "framework7-react";
import CalendarPopup from "components/CalendarPopup";
// import Calc from "components/Calc";
import { useLivingExpensesQuery } from "apollo/graphql/model/living-expenses.graphql";
import { useCreateCostDetailMutation } from "apollo/graphql/model/cost-details.graphql";

const Pay: React.FC = () => {
  const k = useLivingExpensesQuery().data;
  const [createCostDetailMutation] = useCreateCostDetailMutation();

  const [popupOpened, setPopupOpened] = useState(false);
  const [date, setDate] = useState(format(new Date()));

  return (
    <Fragment>
      <Swiper
        className="demo-swiper demo-swiper-auto"
        spaceBetween={10}
        slidesPerView={"auto"}
        centeredSlides
      >
        <SwiperSlide>
          <div className="grid grid-cols-4 gap-4">
            <wired-card
              elevation="2"
              class="text-center font-bold py-4"
              onClick={() => {
                console.log("skdjf");
              }}
            >
              11
            </wired-card>

            <wired-card elevation="2" class="text-center font-bold py-4">
              12
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              13
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              14
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              15
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              16
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              17
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              18
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              19
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              20
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              21
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              22
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              18
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              19
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              20
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              21
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              22
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              18
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              19
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              20
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              21
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              22
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              18
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              19
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              20
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              21
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              22
            </wired-card>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="grid grid-cols-4 gap-4">
            <wired-card elevation="2" class="text-center font-bold py-4">
              23
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              24
            </wired-card>
            <wired-card elevation="2" class="text-center font-bold py-4">
              25
            </wired-card>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* <div
          // className="w-full fixed bottom-0 pt-2 px-2"
          className="pt-2 px-2"
          style={{
            backgroundImage: "linear-gradient(120deg, #2193b0 , #6dd5ed)"
          }}
        >
          <Calc
            date={date}
            onClickCalendar={() => {
              setPopupOpened(true);
            }}
            onConfirm={(value) => {
              console.log(value);
              createCostDetailMutation({
                variables: {
                  input: {
                    expenseId: "10000000-0000-0000-0000-000000000004",
                    expensePrice: 20,
                    remarks: "",
                    purchaseTime: new Date()
                  }
                }
              })
                .then((value) => {
                  console.log("我完成了", value);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
          />
        </div> */}

      <CalendarPopup
        popupOpened={popupOpened}
        value={date}
        onCancel={() => {
          setPopupOpened(false);
        }}
        onConfirm={(date) => {
          setDate(date);
          setPopupOpened(false);
        }}
      />
    </Fragment>
  );
};

export default memo(Pay);
