import React from "react";
import { Page, Block, Navbar, BlockTitle } from "framework7-react";

const About: React.FC = () => {
  return (
    <Page noToolbar>
      <Navbar backLink noHairline title="关于" />
      <BlockTitle className="mt-20">项目声明</BlockTitle>
      <Block strong inset>
        <p>
          本项目宗旨只是为了学习交流，不会投入商业使用中；图片、图标来源网络和网友分享，图片版权归原作者所有，若有侵权问题敬请告知，我们会尽快处理。
          <br />
          <br />
          (っ•̀ω•́)っ✎⁾⁾ 我爱学习
        </p>
      </Block>

      <BlockTitle className="text-center text-gray-500">版本号 v1.0.0</BlockTitle>
    </Page>
  );
};
export default About;
