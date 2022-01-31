import React, { useEffect } from "react";

import PostItem from "./PostItem";
import LoadingSpinner from "../../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import { getAllPosts } from "../../lib/api";
import classes from './PostList.module.css';

const sortPosts = (posts) => {
  return posts.sort((postA, postB) => {
    return postA.id < postB.id ? 1 : -1;
  });
};

const PostList = () => {
  const {
    sendRequest,
    status,
    data: loadedPosts,
    error,
  } = useHttp(getAllPosts, false);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (status === "completed" && (!loadedPosts || loadedPosts.length === 0)) {
    return <div className={classes.noPosts}>No posts found</div>;
  }

  let allPostList;

  if (status === "completed" && loadedPosts.length > 0) {
    const sortedPosts = sortPosts(loadedPosts);

    allPostList = sortedPosts.map((post) => (
      <PostItem
        key={post.id}
        id={post.id}
        title={post.title}
        image={post.image}
        user={post.user}
        date={post.date}
      />
    ));
  }

  return <div>{allPostList}</div>;
};

export default PostList;
