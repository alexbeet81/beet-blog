import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import AuthForm from '../Auth/AuthForm';
import classes from "./Navigation.module.css";

const Navigation = () => {
  const [authFormOpen, setAuthFormOpen] = useState(false)

  const openAuthFormHandler = () => {
    setAuthFormOpen(true);
  };

  const closeAuthFormHandler = () => {
    setAuthFormOpen(false);
  }

  return (
    <Fragment>
      {authFormOpen && <AuthForm onClose={closeAuthFormHandler}/>}
      <div className={classes.navigation}>
        <Link to="/new-post"><Button>new post</Button></Link>
        <Button onClick={openAuthFormHandler}>login</Button>
      </div>
    </Fragment>
  );
};

export default Navigation;
