import { Routes, Route } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import React, { useState } from "react";

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";
import AddPost from "./components/Post/AddPost";
import Post from "./components/Post/Post";

function App() {
  const [posts, setPosts] = useState([]);

  const postAddHandler = (post) => {
    setPosts((prevPost) => prevPost.concat(post));
  };

  return (
    <Fragment>
      <MainHeader />
      <Layout>
        <Routes>
          <Route path="/" element={<PostList />} />
          {/* <Route
            path="/new-post"
            element={<AddPost onAddPost={postAddHandler} />}
          /> */}
          <Route path="/:postId" element={<Post />} />
        </Routes>
      </Layout>
    </Fragment>
  );
}

export default App;
