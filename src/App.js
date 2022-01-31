import { Routes, Route } from "react-router-dom";
import React, { Fragment, Suspense } from "react";

import LoadingSpinner from "./UI/LoadingSpinner";
import MainHeader from "./components/Layout/MainHeader";
import Layout from "./components/Layout/Layout";

const PostList = React.lazy(() => import("./components/Post/PostList"));
const Post = React.lazy(() => import("./components/Post/Post"));
const NotFound = React.lazy(() => import("./components/Layout/NotFound"));

function App() {
  return (
    <Fragment>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <MainHeader />
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Fragment>
  );
}

export default App;
