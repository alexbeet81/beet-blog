import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import classes from "./Post.module.css";
import { getSinglePost, removePost } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../UI/LoadingSpinner";
import useTime from "../../hooks/use-time";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import AuthContext from "../../store/auth-context";

const Post = () => {
  const authCtx = useContext(AuthContext);

  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true);

  const {
    status: removePostStatus,
    sendRequest: removePostRequest,
  } = useHttp(removePost);

  const { timeAgo } = useTime();

  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    sendRequest(postId);
  }, [sendRequest, postId]);

  useEffect(() => {
    if (removePostStatus === "completed") {
      navigate("/");
    }
  }, [removePostStatus, navigate]);

  const openCancelModalHandler = () => {
    setModalOpen(true);
  };

  const closeCancelModalHandler = () => {
    setModalOpen(false);
  };

  const removePostHandler = () => {
    removePostRequest(postId);
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

  const showRemoveButton = loadedPost.userId === authCtx.localId;

  return (
    <div className={classes.post}>
      <h1>{loadedPost.title}</h1>
      <p className={classes.signiture}>{`Posted by ${
        loadedPost.user
      } - ${timeAgo(loadedPost.date)}`}</p>
      <img src={loadedPost.image} alt={loadedPost.title} />
      <p className={classes.content}>{loadedPost.content}</p>
      {showRemoveButton && (
        <Button onClick={openCancelModalHandler}>Remove Post</Button>
      )}
      {modalOpen && (
        <Modal onClose={closeCancelModalHandler}>
          <div className={classes.modal}>
            {removePostStatus === "pending" ? (
              <div className="centered">
                <LoadingSpinner />
              </div>
            ) : (
              <div className={classes.modalMessage}>
                <h1>Are you sure?</h1>
                <p>You will not be able to undo this action.</p>
                <div className={classes.modalButtons}>
                  <Button onClick={closeCancelModalHandler} cancel={true}>
                    cancel
                  </Button>
                  <Button onClick={removePostHandler}>Remove</Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Post;
