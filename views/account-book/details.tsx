import React, { useEffect, useState } from "react";
import { Page, PageContent, Navbar, NavTitle, NavRight, f7 } from "framework7-react";
import { RouterProps } from "typings/f7-route";
import { thousands, toastTip } from "lib/apis/utils";
import { getCalendar } from "lib/apis/dayjs";
import event from "lib/apis/framework-event";
import { Amounts, Icons, CostCard } from "components";
import { useCostDetailsQuery } from "graphql/model/cost-details.graphql";
import { useStatisticalBooksQuery } from "graphql/model/statistics.graphql";
import { useRemoveAccountBooksMutation } from "graphql/model/account-books.graphql";

const Details: React.FC<RouterProps> = ({ f7route, f7router }) => {
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
        toastTip("删除成功");

        event.emit("update-books");
        f7router.back();
      })
      .catch((e) => {
        toastTip("删除失败");
      });
  };
  const onDelConfirm = () => {
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
      <Navbar className="h-12" backLink noHairline>
        <NavTitle className="max-w-48 truncate">{bookName}</NavTitle>
        <NavRight>
          <Icons name="delete-02" className="svg-icon-20 link rounded-lg p-2.5" onClick={onDelConfirm} />
          <Icons name="eidt-01" className="svg-icon-20 link rounded-lg p-2.5" onClick={onNavigate} />
        </NavRight>
      </Navbar>

      <PageContent className="pt-20 px-6 pb-28">
        <section className="shadow-3 rounded-lg py-4 px-4">
          <div className="flex items-center pb-2">
            <Icons name="statistics-01" className="svg-icon-36 pb-0.5" />
            <span className="pl-0.5 leading-6 font-bold text-lg">概括统计</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center shadow-3 rounded-md py-4">
              <div className="text-xs text-gray-700">收入</div>
              <div className="font-semibold truncate px-1">
                <span className="text-sm">￥</span>
                <span className="text-2xl">{thousands(statistical?.income || 0)}</span>
              </div>
            </div>

            <div className="text-center shadow-3 rounded-md py-4">
              <div className="text-xs text-gray-700 font-medium">支出</div>
              <div className="font-semibold truncate px-1">
                <span className="text-sm">￥</span>
                <span className="text-2xl">{thousands(statistical?.pay || 0)}</span>
              </div>
            </div>
          </div>
        </section>

        {details.map((detail) => {
          return (
            <CostCard
              className="mt-8"
              key={detail.id}
              type={detail.expense.expenseType}
              typeName={detail.expense.expenseName}
              time={getCalendar(detail.purchaseTime)}
              amounts={thousands(detail.amounts)}
              remarks={detail.remarks}
            />
          );
        })}
      </PageContent>
    </Page>
  );
};

export default Details;
