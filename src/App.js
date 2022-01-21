import { Routes, Route } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import React, { useState } from "react";

import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";
import PostList from "./components/Post/PostList";
import AddPost from "./components/Post/AddPost";
import Post from "./components/Post/Post";
import LoadingSpinner from "./UI/LoadingSpinner";

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
          <Route path="/" element={<PostList posts={posts} />} />
          <Route
            path="/new-post"
            element={<AddPost onAddPost={postAddHandler} />}
          />
          <Route path="/:postId" element={<Post />} />
        </Routes>
        <div className="centered">
          <LoadingSpinner />
        </div>
      </Layout>
    </Fragment>
  );
}

export default App;
