import React from 'react';
import { Link } from 'react-router-dom';
import { Fragment } from "react/cjs/react.production.min";
import classes from "./MainHeader.module.css";

import Navigation from "./Navigation";

const MainHeader = () => {
  return (
    <Fragment>
      <div className={classes.mainHeader}>
        <Link to="/" style={{ textDecoration: 'none' }}><h1 className={classes.mainTitle}>BeetBlog</h1></Link>
        <Navigation />
      </div>
    </Fragment>
  );
};

export default MainHeader;
