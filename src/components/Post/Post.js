import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./Post.module.css";
import { getSinglePost, removePost } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../UI/LoadingSpinner";
import useTime from "../../hooks/use-time";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

const Post = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deletePost, setDeletPost] = useState(false);
  const navigate = useNavigate();

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true);

  const { sendRequest: removePostRequest, error: removeError } =
    useHttp(removePost);

  const { timeAgo } = useTime();

  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  const openCancelModalHandler = () => {
    setModalOpen(true)
  }

  const closeCancelModalHandler = () => {
    setModalOpen(false)
  };

  const removePostHandler = () => {
    removePostRequest(postId);
    navigate("/");
  };

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

  if (!loadedPost) {
    return <div>No post found</div>;
  }

  return (
    <div className={classes.post}>
      <h1>{loadedPost.title}</h1>
      <p className={classes.signiture}>{`Posted by ${
        loadedPost.user
      } - ${timeAgo(loadedPost.date)}`}</p>
      <img src={loadedPost.image} alt={loadedPost.title} />
      <p className={classes.content}>{loadedPost.content}</p>
      <Button onClick={openCancelModalHandler}>Remove Post</Button>
      {modalOpen && (
        <Modal onClose={closeCancelModalHandler}>
          <h1>Think about it</h1>
          <p>Are you sure you want to remove this post?</p>
          <div className={classes.modalButtons}>
            <Button onClick={closeCancelModalHandler} cancel={true}>
              cancel
            </Button>
            <Button onClick={removePostHandler}>Remove</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Post;
