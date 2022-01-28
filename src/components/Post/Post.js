import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import classes from "./Post.module.css";
import { getSinglePost } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import LoadingSpinner from "../../UI/LoadingSpinner";
import useTime from "../../hooks/use-time";

const Post = () => {
  const {
    sendRequest,
    status,
    data: loadedPost,
    error,
  } = useHttp(getSinglePost, true);

  const { timeAgo } = useTime();

  const params = useParams();
  const { postId } = params;

  useEffect(() => {
    sendRequest(postId)
  }, [sendRequest, postId])

  if (status === 'pending') {
    return <div className="centered"><LoadingSpinner/></div>
  }

  if (error) {
    return <div className="centered">{error}</div>
  }

  if (!loadedPost) {
    return <div>No post found</div>
  }

  return (
    <div className={classes.post}>
      <h1>{loadedPost.title}</h1>
      <p className={classes.signiture}>{`Posted by ${loadedPost.user} - ${timeAgo(loadedPost.date)}`}</p>
      <img src={loadedPost.image} alt={loadedPost.title} />
      <p className={classes.content}>
        {loadedPost.content}
      </p>
    </div>
  );
};

export default Post;
