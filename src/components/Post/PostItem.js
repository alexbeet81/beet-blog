import classes from './PostItem.module.css';

// const getTimeStamp = (timePosted) => {
//   const timeNow = Date.now()
//   console.log(timeNow);
//   const timeSincePost = timeNow - timePosted;

//   return 
// };

const PostItem = (props) => {
  // getTimeStamp();
  return (
    <div className={classes.postItem}>
      <img src={props.image} />
      <div>
        <h1 className={classes.postTitle}>{props.title}</h1>
        <p className={classes.signiture}>{`created by ${props.user} 10 minutes ago`}</p>
      </div>
    </div>
  );
};

export default PostItem;
