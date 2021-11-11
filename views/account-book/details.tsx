import React from "react";
import { Page, PageContent, Navbar, NavTitle } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import Amounts from "components/Amounts";
import { thousands, isSameDay } from "lib/api/utils";
import { format, relative } from "lib/api/dayjs";
import CostCard from "components/CostCard";
import Icons from "components/Icons";
import event from "lib/api/framework-event";
import { useCostDetailsQuery } from "apollo/graphql/model/cost-details.graphql";
import { useStatisticalBooksQuery } from "apollo/graphql/model/statistics.graphql";
import { useRemoveAccountBooksMutation } from "apollo/graphql/model/account-books.graphql";

const Details: React.FC<RouterOpotions> = ({ f7route, f7router }) => {
  const { id, name } = f7route.query;
  const { data } = useCostDetailsQuery({
    variables: { input: { bookId: id } }
  });
  const { data: bookData } = useStatisticalBooksQuery({
    variables: { bookId: id }
  });
  const [removeAccountBooks] = useRemoveAccountBooksMutation();
  const details = data?.costDetails || [];
  const statistical = bookData?.statisticalBooks;

  const onDelete = () => {
    removeAccountBooks({
      variables: { id }
    })
      .then(() => {
        // 提送消息更新内容
        event.emit("update-books");
        f7router.back();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink noHairline>
        <NavTitle className="max-w-48 truncate">{name}</NavTitle>
      </Navbar>

      <PageContent className="pt-20 px-6 pb-28">
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

        <div className="test-bg fixed bottom-6 z-10 rounded-full px-6 py-1 shadow-3 left-1/2 transform -translate-x-1/2 flex items-center">
          <Icons name="delete-02" className="mr-2 link rounded-lg p-2.5" />

          <Icons name="eidt-01" className="link rounded-lg p-2.5" />
        </div>
      </PageContent>
    </Page>
  );
};

export default Details;
