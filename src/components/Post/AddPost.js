import AddPostForm from "../Forms/AddPostForm";
import React from "react";
import classes from "./AddPost.module.css";
import useHttp from "../../hooks/use-http";
import { addPost } from "../../lib/api";

const AddPost = (props) => {
  const { sendRequest, status } = useHttp(addPost);
  
  const addNewPostHandler = (data) => {
    sendRequest(data);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Add New Post</h1>
      <AddPostForm
        onSubmit={addNewPostHandler}
        loading={status === "pending"}
      />
    </div>
  );
};

export default AddPost;
