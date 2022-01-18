import React from 'react';
import PostItem from "./PostItem";

const DUMMY_POSTS = [
  {
    id: "1",
    title: "The first post I've ever written",
    image:
      "https://images.unsplash.com/photo-1642277967961-6c5f8c7d746f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    user: "Alex",
    date: 1642320347232,
  },
  {
    id: "2",
    title: "The Second post I've ever written",
    image:
      "https://images.unsplash.com/photo-1642201344145-0d49517e76e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    user: "Elsa",
    date: 1642323143778,
  },
  {
    id: "3",
    title: "The Third post I've ever written",
    image:
      "https://images.unsplash.com/photo-1642277967961-6c5f8c7d746f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    user: "Bob",
    date: 1642320143778,
  },
];

const PostList = () => {

  const allPostList = DUMMY_POSTS.map((post) => (
    <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.image}
          user={post.user}
          date={post.date}
        />
  ));

  return (
    <div>
      {allPostList}
    </div>
  );
};

export default PostList;
