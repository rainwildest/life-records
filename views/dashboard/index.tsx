import React, { useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import f7params from "lib/configure/f7params";

// App.jsx
import {
  App,
  View,
  Page,
  Navbar,
  Toolbar,
  Link as FrameworkLink
} from "framework7-react";

const Index: React.FC = () => (
  // Main Framework7 App component where we pass Framework7 params
  <App {...f7params}>
    {/* Your main view, should have "main" prop */}
    <View main themeDark={false}>
      {/*  Initial Page */}
      <Page>
        {/* Top Navbar */}
        <Navbar title="Awesome App"></Navbar>
        {/* Toolbar */}
        <Toolbar bottom>
          <FrameworkLink>Link 1</FrameworkLink>
          <FrameworkLink>Link 2</FrameworkLink>
        </Toolbar>
        {/* Page Content */}
        <p>Page content goes here</p>
        <FrameworkLink href="/about">About App</FrameworkLink>
      </Page>
    </View>
  </App>
);

export default Index;
