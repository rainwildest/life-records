import React, { useRef } from "react";
import { Sheet, Page, Navbar, NavRight, PageContent } from "framework7-react";
import { Icons } from "components";
import { AccountBooks } from "@graphql-types@";

type BookSheetProps = {
  data?: Array<AccountBooks>;
  sheetBookOpened?: boolean;
  onConfirm?: (val: string) => void;
  onSheetClosed?: () => void;
};
const BookSheet: React.FC<BookSheetProps> = ({ data = [], sheetBookOpened, onConfirm, onSheetClosed }) => {
  const hasConfirm = useRef(false);
  const insideClosed = useRef(false);

  const onBookConfirm = (val: string) => {
    return () => {
      hasConfirm.current = true;

      !!onConfirm && onConfirm(val);
      !!onSheetClosed && onSheetClosed();
    };
  };

  const onCancelClosed = () => {
    insideClosed.current = true;

    onSheetClosed && onSheetClosed();
  };

  const onInsideSheetClosed = () => {
    const hasClose = !!onSheetClosed && !hasConfirm.current && !insideClosed.current;

    hasClose && onSheetClosed();

    insideClosed.current = false;
    hasConfirm.current = false;
  };

  return (
    <Sheet
      backdrop
      swipeToClose
      className="h-2/3 rounded-t-xl overflow-hidden"
      opened={sheetBookOpened}
      onSheetClosed={onInsideSheetClosed}
    >
      <Page pageContent={false}>
        <Navbar className="h-14" noHairline title="计划类型">
          <NavRight>
            <div className="px-3 flex items-center link" onClick={onCancelClosed}>
              <i className="f7-icons">multiply_circle</i>
            </div>
          </NavRight>
        </Navbar>
        <PageContent className="pt-16 pb-10">
          <div className="pt-3 grid grid-cols-2 gap-3 px-5">
            {data?.map((item) => {
              return (
                <div
                  className="shadow-3 shadow-active-3 rounded-lg flex py-3 px-2 justify-start items-center"
                  key={item.id}
                  data-id={item.id}
                  onClick={onBookConfirm(item.id)}
                >
                  <Icons name="ancient-books" className="scale-80 pointer-events-none" />
                  <div className="overflow-hidden pointer-events-none">
                    <div className="text-gray-400 text-xs">账簿名称</div>
                    <div className="mt-1 break-all text-sm font-semibold text-gray-900 truncate tracking-widest">{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </PageContent>
      </Page>
    </Sheet>
  );
};

export default BookSheet;
