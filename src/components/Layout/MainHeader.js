import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import classes from "./MainHeader.module.css";

import AuthContext from "../../store/auth-context";
import Navigation from "./Navigation";

const MainHeader = (props) => {
  const authCtx = useContext(AuthContext);

  let titleName = "Beet";
  if (authCtx.displayName !== "") {
    titleName = authCtx.displayName;
  }

  return (
    <Fragment>
      <div className={classes.mainHeader}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1 className={classes.mainTitle}>{`${titleName}Blog`}</h1>
        </Link>
        <Navigation />
      </div>
    </Fragment>
  );
};

export default MainHeader;
