import React, { memo } from "react";
import Icons from "components/Icons";

const MineDetails: React.FC = () => {
  return (
    <div className="mine-bg-color w-full h-48 mb-32">
      <div className="mine-container p-5 mx-3 rounded-lg relative bg-white flex flex-col">
        <div className="flex-1 flex items-center">
          <div className="mine-avatar w-16 h-16 rounded-full mr-5 bg-gray-100 flex items-center justify-center overflow-hidden">
            <Icons name="moon" />
          </div>

          <section>
            <div className="text-xl font-bold">rainwildest</div>
            <div className="text-sm font-medium">rainwildest@163.com</div>
          </section>
        </div>
        <div className="grid grid-cols-3 mt-6">
          <section>
            <span className="block my-0 text-center font-bold text-lg">20</span>
            <span className="block my-0 text-center text-gray-400 text-sm">
              天/元
            </span>
          </section>
          <section>
            <span className="block my-0 text-center font-bold text-lg">20</span>
            <span className="block my-0 text-center text-gray-400 text-sm">
              月/元
            </span>
          </section>
          <section>
            <span className="block my-0 text-center font-bold text-lg">
              200
            </span>
            <span className="block my-0 text-center text-gray-400 text-sm">
              年/元
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default memo(MineDetails);
