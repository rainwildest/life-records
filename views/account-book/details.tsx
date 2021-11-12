import React, { useEffect, useState } from "react";
import { Page, PageContent, Navbar, NavTitle, f7 } from "framework7-react";
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
  const [bookName, setBookName] = useState(name);

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
  const delConfirm = () => {
    f7.dialog.confirm(`是否确定删除 ${name}`, "删除提示", function () {
      onDelete();
    });
  };

  const onNavigate = () => {
    const url = f7router.generateUrl({
      name: "account-book-modify",
      params: { id: "id", name: "name" },
      query: { id, name: bookName }
    });
    f7router.navigate(url);
  };

  const updateName = (name: string) => {
    setBookName(name);
  };

  useEffect(() => {
    event.on("update-name", updateName);

    return () => {
      event.off("update-name", updateName);
    };
  }, []);

  return (
    <Page noToolbar pageContent={false}>
      <Navbar backLink noHairline>
        <NavTitle className="max-w-48 truncate">{bookName}</NavTitle>
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

        <div className="test-bg rounded-full fixed bottom-4 px-3 py-2 left-1/2 transform -translate-x-1/2 z-10 ">
          <div className="rounded-full px-6 py-1 shadow-3 flex items-center">
            <Icons
              name="delete-02"
              className="mr-2 link rounded-lg p-2.5"
              onClick={delConfirm}
            />

            <Icons
              name="eidt-01"
              className="link rounded-lg p-2.5"
              onClick={onNavigate}
            />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Details;
