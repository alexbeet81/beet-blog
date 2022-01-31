import { Routes, Route } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import React, { useState } from "react";

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <Layout>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/:postId" element={<Post />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
