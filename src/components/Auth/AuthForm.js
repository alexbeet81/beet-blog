import React, { useState, useRef } from "react";
import validator from "validator";

import Modal from "../../UI/Modal";
import classes from "./AuthForm.module.css";
import Button from "../../UI/Button";
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
import { signUp, login } from "../../lib/api";
import SmallLoadingSpinner from "../../UI/SmallLoadingSpinner";

const AuthForm = (props) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const {
    status: signUpStatus,
    error: signUpError,
    sendRequest: sendSignUpResquest,
  } = useHttp(signUp);

  const {
    status: loginStatus,
    error: loginError,
    sendRequest: sendloginResquest,
  } = useHttp(login);

  let userLogInData;

  const submitHander = (event) => {
    event.preventDefault();

    const userDetails = {
      displayName: usernameValue,
      email: emailValue,
      password: passwordValue,
      returnSecureToken: true
    }

    if (isLogin) {
      sendloginResquest(userDetails);
    } else {
      sendSignUpResquest(userDetails);
    }
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetEmail();
    resetPassword();
    resetUsername();
  };

  const checkIsNotEmpty = (value) => value.trim() !== "";

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHander,
    reset: resetUsername,
  } = useInput(checkIsNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHander,
    reset: resetEmail,
  } = useInput((value) => validator.isEmail(value));

  // const strongPassword = (value) => validator.isStrongPassword(value, { minLength: 8 });

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHander,
    reset: resetPassword,
  } = useInput((value) => value.length >= 6);

  let formIsValid;

  if (isLogin) {
    formIsValid = emailIsValid && passwordIsValid;
  } else {
    formIsValid = usernameIsValid && emailIsValid && passwordIsValid;
  }

  const usernameClasses = usernameHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const emailClasses = emailHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const passwordClasses = passwordHasError
    ? `${classes.formControl} ${classes.invalid}`
    : classes.formControl;

  const buttonSignUpText =
    signUpStatus === "pending" ? <SmallLoadingSpinner /> : "sign up";
  
  const buttonLoginText = loginStatus === "pending" ? <SmallLoadingSpinner /> : "login";

  return (
    <Modal onClose={props.onClose}>
      <section className={classes.auth}>
        <form onSubmit={submitHander}>
          <h1>{isLogin ? "Login" : "Sign up"}</h1>
          <div className={classes.controlGroup}>
            {!isLogin && (
              <div className={usernameClasses}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  ref={usernameRef}
                  value={usernameValue}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHander}
                />
                {usernameHasError && (
                  <p className={classes.errorText}>please enter a username</p>
                )}
              </div>
            )}
            <div className={emailClasses}>
              <label htmlFor="e-mail">e-mail</label>
              <input
                type="text"
                id="e-mail"
                ref={emailRef}
                value={emailValue}
                onChange={emailChangeHandler}
                onBlur={emailBlurHander}
              />
              {emailHasError && (
                <p className={classes.errorText}>please enter valid email</p>
              )}
            </div>
            <div className={passwordClasses}>
              <label htmlFor="password">password</label>
              <input
                type="text"
                id="password"
                ref={passwordRef}
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHander}
              />
              {passwordHasError && (
                <p className={classes.errorText}>
                  password should be at least 6 characters
                </p>
              )}
            </div>
          </div>
          <div className={classes.formActions}>
            <Button onClick={props.onClose} cancel={true} type="submit">
              cancel
            </Button>
            <Button disabled={!formIsValid} type="submit">
              {isLogin ? buttonLoginText : buttonSignUpText}
            </Button>
          </div>
          <button
            type="button"
            onClick={switchAuthModeHandler}
            className={classes.loginToggle}
          >
            {isLogin ? "create a new account" : "login with exsisting account"}
          </button>
        </form>
      </section>
    </Modal>
  );
};

export default AuthForm;
