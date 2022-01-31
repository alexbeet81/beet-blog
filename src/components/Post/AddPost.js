import AddPostForm from "../Forms/AddPostForm";
import React, { useEffect } from "react";
import classes from "./AddPost.module.css";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../lib/api";
import Modal from "../../UI/Modal";

const AddPost = (props) => {
  const navigate = useNavigate();
  const { sendRequest, status, data: postId } = useHttp(addPost);

  const addNewPostHandler = (data) => {
    sendRequest(data);
  };

  useEffect(() => {
    if (status === "completed") {
      navigate(`/post/${postId}`);
      props.onClose();
    }
  }, [status, navigate, postId, props]);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <h1 className={classes.title}>Add New Post</h1>
        <AddPostForm
          onSubmit={addNewPostHandler}
          loading={status === "pending"}
          onClose={props.onClose}
        />
      </div>
    </Modal>
  );
};

export default AddPost;
