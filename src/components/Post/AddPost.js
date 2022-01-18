import AddPostForm from "../Forms/AddPostForm";
import React from "react";
import classes from './AddPost.module.css';

const AddPost = () => {
  const addNewPostHandler = (data) => {
    // api post request
    console.log(data);
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Add new Post</h1>
      <AddPostForm onSubmit={addNewPostHandler}/>
    </div>
  )
};

export default AddPost;