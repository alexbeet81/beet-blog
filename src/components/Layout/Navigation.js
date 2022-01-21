import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className={classes.navigation}>
        <Link to="/new-post"><Button>new post</Button></Link>
        <Button>login</Button>
        <Button>signup</Button>
      </div>
    </Fragment>
  );
};

export default Navigation;
