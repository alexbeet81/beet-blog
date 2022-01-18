import React from 'react';
import { useRef } from "react";
import validator from "validator";

import classes from "./Form.module.css";
import Button from "../../UI/Button";
import useInput from "../hooks/use-input";

const AddPostForm = (props) => {
  const titleRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();

  const checkIsNotEmpty = (value) => value.trim() !== "";
  // const checkIsNotEmpty = (value) => console.log(value.length)
  // I WANT TO BE ABLE TO CHECK IF THIS IS A REAL URL

  // const isValidUrl = (_string) => {
  //   const re = new RegExp('/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm');
    
  //   return re.test(_string);
  // }
  // const re = new RegExp(
  //   "/[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}.[a-z]{2,4}\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi"
  // );

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
            <p className={classes.errorText}>cannot be empty</p>
          )}
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
