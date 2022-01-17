import { Fragment } from "react/cjs/react.production.min";
import Button from "../../UI/Button";
import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <Fragment>
      <div className={classes.navigation}>
        <Button>new post</Button>
        <Button>login</Button>
        <Button>signup</Button>
      </div>
    </Fragment>
  );
};

export default Navigation;
