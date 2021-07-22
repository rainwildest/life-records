import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";

// App.jsx
import { View, Page, Toolbar, Block, Views, Link } from "framework7-react";

const Index: React.FC = () => {
  return (
    // Main Framework7 App component where we pass Framework7 params
    <Views tabs themeDark={true}>
      <Toolbar tabbar labels bottom>
        <Link
          tabLink="#tab-1"
          tabLinkActive
          iconIos="f7:house_fill"
          iconAurora="f7:house_fill"
          iconMd="material:home"
          text="Home"
        />
        <Link
          tabLink="#tab-2"
          iconIos="f7:square_list_fill"
          iconAurora="f7:square_list_fill"
          iconMd="material:view_list"
          text="Catalog"
        />
        <Link
          tabLink="#tab-3"
          iconIos="f7:gear"
          iconAurora="f7:gear"
          iconMd="material:settings"
          text="Settings"
        />
      </Toolbar>

      <View tab id="tab-1" main tabActive>
        <Page>
          <Block>
            <p>Tab 1 content</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              enim quia molestiae facilis laudantium voluptates obcaecati
              officia cum, sit libero commodi. Ratione illo suscipit temporibus
              sequi iure ad laboriosam accusamus?
            </p>
            <p>
              Saepe explicabo voluptas ducimus provident, doloremque quo totam
              molestias! Suscipit blanditiis eaque exercitationem praesentium
              reprehenderit, fuga accusamus possimus sed, sint facilis ratione
              quod, qui dignissimos voluptas! Aliquam rerum consequuntur
              deleniti.
            </p>
            <p>
              Totam reprehenderit amet commodi ipsum nam provident doloremque
              possimus odio itaque, est animi culpa modi consequatur reiciendis
              corporis libero laudantium sed eveniet unde delectus a maiores
              nihil dolores? Natus, perferendis.
            </p>
            <p>
              Atque quis totam repellendus omnis alias magnam corrupti, possimus
              aspernatur perspiciatis quae provident consequatur minima
              doloremque blanditiis nihil maxime ducimus earum autem. Magni
              animi blanditiis similique iusto, repellat sed quisquam!
            </p>
            <p>
              Suscipit, facere quasi atque totam. Repudiandae facilis at optio
              atque, rem nam, natus ratione cum enim voluptatem suscipit veniam!
              Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid
              impedit! Adipisci!
            </p>
            <p>
              Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae
              consectetur iste fugiat iusto dolorem autem. Itaque, ipsa
              voluptas, a assumenda rem, dolorum porro accusantium, officiis
              veniam nostrum cum cumque impedit.
            </p>
            <p>
              Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur
              rem, natus ad praesentium rerum libero consectetur temporibus
              cupiditate atque aspernatur, eaque provident eligendi quaerat ea
              soluta doloremque. Iure fugit, minima facere.
            </p>
          </Block>
        </Page>
      </View>
      <View tab id="tab-2">
        <Page>
          <Block>
            <p>Tab 2 content</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              enim quia molestiae facilis laudantium voluptates obcaecati
              officia cum, sit libero commodi. Ratione illo suscipit temporibus
              sequi iure ad laboriosam accusamus?
            </p>
            <p>
              Saepe explicabo voluptas ducimus provident, doloremque quo totam
              molestias! Suscipit blanditiis eaque exercitationem praesentium
              reprehenderit, fuga accusamus possimus sed, sint facilis ratione
              quod, qui dignissimos voluptas! Aliquam rerum consequuntur
              deleniti.
            </p>
            <p>
              Totam reprehenderit amet commodi ipsum nam provident doloremque
              possimus odio itaque, est animi culpa modi consequatur reiciendis
              corporis libero laudantium sed eveniet unde delectus a maiores
              nihil dolores? Natus, perferendis.
            </p>
            <p>
              Atque quis totam repellendus omnis alias magnam corrupti, possimus
              aspernatur perspiciatis quae provident consequatur minima
              doloremque blanditiis nihil maxime ducimus earum autem. Magni
              animi blanditiis similique iusto, repellat sed quisquam!
            </p>
            <p>
              Suscipit, facere quasi atque totam. Repudiandae facilis at optio
              atque, rem nam, natus ratione cum enim voluptatem suscipit veniam!
              Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid
              impedit! Adipisci!
            </p>
            <p>
              Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae
              consectetur iste fugiat iusto dolorem autem. Itaque, ipsa
              voluptas, a assumenda rem, dolorum porro accusantium, officiis
              veniam nostrum cum cumque impedit.
            </p>
            <p>
              Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur
              rem, natus ad praesentium rerum libero consectetur temporibus
              cupiditate atque aspernatur, eaque provident eligendi quaerat ea
              soluta doloremque. Iure fugit, minima facere.
            </p>
          </Block>
        </Page>
      </View>
      <View tab id="tab-3">
        <Page>
          <Block>
            <p>Tab 3 content</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              enim quia molestiae facilis laudantium voluptates obcaecati
              officia cum, sit libero commodi. Ratione illo suscipit temporibus
              sequi iure ad laboriosam accusamus?
            </p>
            <p>
              Saepe explicabo voluptas ducimus provident, doloremque quo totam
              molestias! Suscipit blanditiis eaque exercitationem praesentium
              reprehenderit, fuga accusamus possimus sed, sint facilis ratione
              quod, qui dignissimos voluptas! Aliquam rerum consequuntur
              deleniti.
            </p>
            <p>
              Totam reprehenderit amet commodi ipsum nam provident doloremque
              possimus odio itaque, est animi culpa modi consequatur reiciendis
              corporis libero laudantium sed eveniet unde delectus a maiores
              nihil dolores? Natus, perferendis.
            </p>
            <p>
              Atque quis totam repellendus omnis alias magnam corrupti, possimus
              aspernatur perspiciatis quae provident consequatur minima
              doloremque blanditiis nihil maxime ducimus earum autem. Magni
              animi blanditiis similique iusto, repellat sed quisquam!
            </p>
            <p>
              Suscipit, facere quasi atque totam. Repudiandae facilis at optio
              atque, rem nam, natus ratione cum enim voluptatem suscipit veniam!
              Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid
              impedit! Adipisci!
            </p>
            <p>
              Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae
              consectetur iste fugiat iusto dolorem autem. Itaque, ipsa
              voluptas, a assumenda rem, dolorum porro accusantium, officiis
              veniam nostrum cum cumque impedit.
            </p>
            <p>
              Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur
              rem, natus ad praesentium rerum libero consectetur temporibus
              cupiditate atque aspernatur, eaque provident eligendi quaerat ea
              soluta doloremque. Iure fugit, minima facere.
            </p>
          </Block>
        </Page>
      </View>
    </Views>
  );
};

export default Index;
