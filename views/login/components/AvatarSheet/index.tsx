import React, { useRef } from "react";
import { Sheet, Page, Navbar, NavRight, PageContent } from "framework7-react";
import { Icons } from "components";

type BookSheetProps = {
  sheetOpened?: boolean;
  onConfirm?: (val: string) => void;
  onSheetClosed?: () => void;
};
const BookSheet: React.FC<BookSheetProps> = ({ sheetOpened, onConfirm, onSheetClosed }) => {
  const hasConfirm = useRef(false);
  const insideClosed = useRef(false);
  const avatars = new Array(11).fill(0).map((item, index) => `avatar-${index < 9 ? `0${index + 1}` : index + 1}`);

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
      opened={sheetOpened}
      onSheetClosed={onInsideSheetClosed}
    >
      <Page pageContent={false}>
        <Navbar className="h-14" noHairline title="选择头像">
          <NavRight>
            <div className="px-3 flex items-center link" onClick={onCancelClosed}>
              <i className="f7-icons">multiply_circle</i>
            </div>
          </NavRight>
        </Navbar>
        <PageContent className="pt-16 pb-10">
          <div className="pt-3 grid grid-cols-4 gap-4 px-5">
            {avatars.map((avatar) => (
              <div
                className="shadow-3 shadow-active-3 rounded-lg flex py-3 px-2 justify-center items-center"
                onClick={onBookConfirm(avatar)}
              >
                <Icons name={avatar} className="pointer-events-none" />
              </div>
            ))}
          </div>
        </PageContent>
      </Page>
    </Sheet>
  );
};

export default BookSheet;
