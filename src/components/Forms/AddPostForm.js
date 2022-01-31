import React, { useRef, useContext } from "react";
import validator from "validator";

import classes from "./Form.module.css";
import Button from "../../UI/Button";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";

const AddPostForm = (props) => {
  const authCtx = useContext(AuthContext);

  const titleRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();

  const checkIsNotEmpty = (value) => value.trim() !== "";

  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput((value) => value.trim() !== "" && value.length < 50);

  const {
    value: imageValue,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImage,
  } = useInput((value) => validator.isURL(value));

  const {
    value: contentValue,
    isValid: contentIsValid,
    hasError: contentHasError,
    valueChangeHandler: contentChangeHandler,
    inputBlurHandler: contentBlurHandler,
    reset: resetContent,
  } = useInput(checkIsNotEmpty);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const newPost = {
      title: titleRef.current.value,
      image: imageRef.current.value,
      content: contentRef.current.value,
      user: authCtx.displayName,
      userId: authCtx.localId,
      date: Date.now(),
    };

    props.onSubmit(newPost);
    resetTitle();
    resetImage();
    resetContent();
  };

  const formIsValid = titleIsValid && imageIsValid && contentIsValid;

  const titleClasses = titleHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const imageClasses = imageHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const contentClasses = contentHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.controlGroup}>
        <div className={titleClasses}>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            value={titleValue}
            onChange={titleChangeHandler}
            onBlur={titleBlurHandler}
          />
          {titleHasError && (
            <p className={classes.errorText}>
              must be between 1 and 50 characters
            </p>
          )}
        </div>
        <div className={imageClasses}>
          <label htmlFor="image">image</label>
          <input
            type="text"
            id="image"
            ref={imageRef}
            value={imageValue}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}
          />
          {imageHasError && (
            <p className={classes.errorText}>must be a valid url</p>
          )}
        </div>
        <div className={contentClasses}>
          <label htmlFor="content">content</label>
          <textarea
            type="textarea"
            rows="4"
            cols="50"
            id="content"
            ref={contentRef}
            value={contentValue}
            onChange={contentChangeHandler}
            onBlur={contentBlurHandler}
          />
          {contentHasError && (
            <p className={classes.errorText}>write something interesting!</p>
          )}
        </div>
        <div className={classes.formActions}>
          <Button onClick={props.onClose} cancel={true} type="button">
            cancel
          </Button>
          <Button disabled={!formIsValid} type="submit">
            {props.loading ? "sending..." : "submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
