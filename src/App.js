import { Fragment } from "react/cjs/react.production.min";
import React from 'react';

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";
import AddPostForm from "./components/Forms/AddPostForm";
import AddPost from "./components/Post/AddPost";

function App() {
  return (
    <Fragment>
      <MainHeader />
      <Layout>
        {/* <PostList/> */}
        <AddPost />
      </Layout>
    </Fragment>
  );
}

export default App;
