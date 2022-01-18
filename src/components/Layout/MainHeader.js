import React from 'react';
import { Fragment } from "react/cjs/react.production.min";
import classes from "./MainHeader.module.css";

import Navigation from "./Navigation";

const MainHeader = () => {
  return (
    <Fragment>
      <div className={classes.mainHeader}>
        <h1 className={classes.mainTitle}>BeetBlog</h1>
        <Navigation />
      </div>
    </Fragment>
  );
};

export default MainHeader;
