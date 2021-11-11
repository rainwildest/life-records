import React from "react";
import { Page, Navbar, NavTitle, NavRight } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import { useCostDetailsQuery } from "apollo/graphql/model/cost-details.graphql";
import { useStatisticalBooksQuery } from "apollo/graphql/model/statistics.graphql";
import Amounts from "components/Amounts";
import { thousands, isSameDay } from "lib/api/utils";
import { format, relative } from "lib/api/dayjs";
import CostCard from "components/CostCard";
import Icons from "components/Icons";

const Details: React.FC<RouterOpotions> = ({ f7route }) => {
  const { id, name } = f7route.query;
  const { data } = useCostDetailsQuery({
    variables: { input: { bookId: id } }
  });
  const { data: bookData } = useStatisticalBooksQuery({
    variables: { bookId: id }
  });
  const details = data?.costDetails || [];
  const statistical = bookData?.statisticalBooks;

  return (
    <Page noToolbar>
      <Navbar backLink noHairline>
        <NavTitle className="max-w-48 truncate">{name}</NavTitle>
        <NavRight>
          <Icons name="delete-02" />
          <Icons name="eidt-01" />
        </NavRight>
      </Navbar>

      <div className="pt-2 px-6 mt-10">
        <Amounts
          pay={thousands(statistical?.pay || 0)}
          income={thousands(statistical?.income || 0)}
        />

        {details.map((detail) => {
          const _isSameDay = isSameDay(detail.purchaseTime);
          const _fun = _isSameDay ? relative : format;

          return (
            <CostCard
              className="mt-8"
              key={detail.id}
              type={detail.expense.expenseType}
              typeName={detail.expense.expenseName}
              time={_fun(detail.purchaseTime)}
              amounts={thousands(detail.amounts)}
              remarks={detail.remarks}
            />
          );
        })}
      </div>
    </Page>
  );
};

export default Details;
