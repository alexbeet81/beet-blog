import AddPostForm from "../Forms/AddPostForm";
import React from "react";
import classes from "./AddPost.module.css";
import useHttp from "../hooks/use-http";

const AddPost = (props) => {
  const { isLoading, error, sendRequest: sendNewPostRequest } = useHttp();

  const createNewPost = (postText, postData) => {
    const generatedId = postData.title;
    const createdPost = { id: generatedId, text: postText }

    props.onAddPost;
  };

  const addNewPostHandler = (data) => {
    // api post request

    console.log(data);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Add New Post</h1>
      <AddPostForm onSubmit={addNewPostHandler} />
    </div>
  );
};

export default AddPost;
