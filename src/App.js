import { Routes, Route } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import React, { useState } from "react";

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";
import Post from "./components/Post/Post";
import NotFound from "./components/Layout/NotFound";

function App() {
  return (
    <Fragment>
      <Layout>
        <MainHeader />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
