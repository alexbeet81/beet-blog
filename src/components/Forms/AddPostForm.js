import { useRef } from "react";

import classes from "./Form.module.css";
import Button from "../../UI/Button";
import useInput from "../hooks/use-input";

const AddPostForm = (props) => {
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
  } = useInput(checkIsNotEmpty);

  const {
    value: imageValue,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImage,
  } = useInput(checkIsNotEmpty);

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
    };

    props.onSubmit(newPost);
    resetTitle();
  };

  const formIsValid = titleIsValid && imageIsValid;

  const titleClasses = titleHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const imageClasses = imageHasError ? `${classes.formControl} ${classes.invalid}` : classes.formControl

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
              must be between 1 and 100 characters
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
            <p className={classes.errorText}>
              must be a valid url
            </p>
          )}
        </div>
        <div className={classes.formControl}>
          <label htmlFor="content">content</label>
          <textarea
            type="textarea"
            rows="4"
            cols="50"
            id="content"
            ref={contentRef}
          />
        </div>
        <div className={classes.formActions}>
          <Button disabled={!formIsValid} type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
