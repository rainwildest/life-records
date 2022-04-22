import React, { useEffect, useState } from "react";
import { Page, PageContent, Navbar, NavTitle, NavRight, f7 } from "framework7-react";
import { RouterOpotions } from "typings/f7-route";
import { thousands } from "lib/apis/utils";
import { getCalendar } from "lib/apis/dayjs";
import event from "lib/apis/framework-event";
import { Amounts, Icons, CostCard } from "components";
import { useCostDetailsQuery } from "graphql/model/cost-details.graphql";
import { useStatisticalBooksQuery } from "graphql/model/statistics.graphql";
import { useRemoveAccountBooksMutation } from "graphql/model/account-books.graphql";

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
        <Amounts pay={thousands(statistical?.pay || 0)} income={thousands(statistical?.income || 0)} />

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
