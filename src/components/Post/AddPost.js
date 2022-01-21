import AddPostForm from "../Forms/AddPostForm";
import React from "react";
import classes from "./AddPost.module.css";
import useHttp from "../hooks/use-http";

const AddPost = (props) => {
  const { isLoading, error, sendRequest: sendNewPostRequest } = useHttp();

  const createNewPost = (postText, postData) => {
    const generatedId = postData.title;
    const createdPost = { id: generatedId, text: postText };

    // props.onAddPost;
  };

  const addNewPostHandler = async (data) => {
    sendNewPostRequest({
      url: "https://beet-blog-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: data.title,
        image: data.image,
        content: data.content,
        user: "Alex",
        date: new Date(),
      },
    });
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Add New Post</h1>
      <AddPostForm onSubmit={addNewPostHandler} loading={isLoading} />
    </div>
  );
};

export default AddPost;
