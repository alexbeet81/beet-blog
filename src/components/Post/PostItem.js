import React from "react";
import { Link } from "react-router-dom";
import classes from "./PostItem.module.css";
import useTime from "../../hooks/use-time";

const PostItem = (props) => {
  const { timeAgo } = useTime();

  const timePosted = timeAgo(props.date);
  return (
    <Link to={`/${props.id}`} style={{ textDecoration: "none" }}>
      <div className={classes.postItem}>
        <img src={props.image} alt={props.postTitle} />
        <div className={classes.postAndSignitureDiv}>
          <h1 className={classes.postTitle}>{props.title}</h1>
          <p
            className={classes.signiture}
          >{`Posted by ${props.user} ${timePosted}`}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
