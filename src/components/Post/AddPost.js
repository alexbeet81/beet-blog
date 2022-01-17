import AddPostForm from "../Forms/AddPostForm";
import classes from './AddPost.module.css';

const AddPost = () => {
  const addNewPostHandler = (data) => {
    // api post request
    console.log(data);
  }
  return (
    <div>
      <h1>Add new Post</h1>
      <AddPostForm onSubmit={addNewPostHandler}/>
    </div>
  )
};

export default AddPost;