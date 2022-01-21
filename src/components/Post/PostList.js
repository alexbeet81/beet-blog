import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import useHttp from "../../hooks/use-http";

const sortPosts = (posts) => {
  return posts.sort((postA, postB) => {
    return postA.id < postB.id ? 1 : -1;
  });
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { isLoading, error, sendRequest: fetchPosts } = useHttp();

  useEffect(() => {
    const transformPosts = (postObject) => {
      const loadedPosts = [];

      for (const postKey in postObject) {
        loadedPosts.push({
          id: postKey,
          title: postObject[postKey].title,
          image: postObject[postKey].image,
          user: postObject[postKey].user,
          date: postObject[postKey].date,
        });
      }

      setPosts(loadedPosts);
    };

    fetchPosts(
      {
        url: "https://beet-blog-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
      },
      transformPosts
    );
  }, [fetchPosts]);

  let allPostList;

  if (isLoading) {
    allPostList = <p>Loading...</p>;
  }

  if (posts.length === 0) {
    allPostList = <p>No posts found. Be the first to add one</p>;
  }

  const sortedPosts = sortPosts(posts);

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

  return <div>{allPostList}</div>;
};

export default PostList;
