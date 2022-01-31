import AddPostForm from "../Forms/AddPostForm";
import React from "react";
import classes from "./AddPost.module.css";
import useHttp from "../../hooks/use-http";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../lib/api";
import { useEffect } from "react/cjs/react.development";
import Modal from "../../UI/Modal";

const AddPost = (props) => {
  const navigate = useNavigate();
  const { sendRequest, status, data: postId } = useHttp(addPost);

  const addNewPostHandler = (data) => {
    sendRequest(data);
  };

  useEffect(() => {
    if (status === "completed") {
      navigate(`/${postId}`);
      props.onClose();
    }
  }, [status, navigate]);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <h1 className={classes.title}>Add New Post</h1>
        <AddPostForm
          onSubmit={addNewPostHandler}
          loading={status === "pending"}
        />
      </div>
    </Modal>
  );
};

export default AddPost;
