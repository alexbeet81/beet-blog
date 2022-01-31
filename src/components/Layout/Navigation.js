import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from "react/cjs/react.production.min";
import AuthContext from '../../store/auth-context';
import Button from "../../UI/Button";
import AuthForm from '../Auth/AuthForm';
import classes from "./Navigation.module.css";
import AddPost from '../Post/AddPost';

const Navigation = (props) => {
  const authCtx = useContext(AuthContext)

  const isLoggedIn = authCtx.isLoggedIn;

  const [authFormOpen, setAuthFormOpen] = useState(false)
  const [addPostOpen, setAddPostOpen] = useState(false)

  const openNewPostHandler = () => {
    setAddPostOpen(true);
  }

  const closeNewPostHander = () => {
    setAddPostOpen(false);
  };

  const openAuthFormHandler = () => {
    setAuthFormOpen(true);
  };

  const closeAuthFormHandler = () => {
    setAuthFormOpen(false);
  }

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Fragment>
      {authFormOpen && <AuthForm onClose={closeAuthFormHandler}/>}
      {addPostOpen && <AddPost onClose={closeNewPostHander} />}
      <div className={classes.navigation}>
        {isLoggedIn && <Button onClick={openNewPostHandler}>new post</Button>}
        {isLoggedIn && <Button onClick={logoutHandler}>logout</Button>}
        {!isLoggedIn && <Button onClick={openAuthFormHandler}>login</Button>}
      </div>
    </Fragment>
  );
};

export default Navigation;
