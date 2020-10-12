import React, { useContext, useRef, useState } from "react";
import { GlobalContext } from "../../../context/GlobalState";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
// import Loader from "react-loader-spinner";

export default function SignUpModal({ handleClose }) {
  const { registerUser, token, errMsg } = useContext(GlobalContext);
  const [isShowingPw, setIsShowingPw] = useState(false);
  const [isShowingConfirmPw, setIsShowingConfirmPw] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const emailElRef = useRef();
  const pwElRef = useRef();
  const confirmPwElRef = useRef();
  const displayNameElRef = useRef();

  function handleRegisterUser(e) {
    e.preventDefault();

    if (isShowingPw || isShowingConfirmPw) {
      setIsShowingPw(false);
      setIsShowingConfirmPw(false);
    }

    const email = emailElRef.current ? emailElRef.current.value : "";
    const pw = pwElRef.current ? pwElRef.current.value : "";
    const confirmPw = confirmPwElRef.current
      ? confirmPwElRef.current.value
      : "";
    const displayName = displayNameElRef.current
      ? displayNameElRef.current.value
      : "";

    registerUser(displayName, email, pw, confirmPw);

    // if (!token) {
    //   setIsSubmitting(true);
    // }

    if (token) {
      handleClose();
      // setIsSubmitting(false);
    }
  }

  function togglePwRevealer() {
    setIsShowingPw(!isShowingPw);
  }

  function toggleConfirmPwRevealer() {
    setIsShowingConfirmPw(!isShowingConfirmPw);
  }

  return (
    <>
      {/* {!token && isSubmitting && ( */}
      {/* <div className="all-center-column">
          <Loader type="Puff" color="#5fb0e5" height={200} width={200} />
          <span className="mt-3 text-center">
            Please wait while we're creating your account
          </span>
        </div> */}
      {/* // )} */}

      {/* {!isSubmitting && ( */}
      <>
        <h2 className="bold mb-4">Sign Up</h2>
        <form className="form" onSubmit={handleRegisterUser}>
          <div className="form-group">
            <label htmlFor="displayName" className="bold d-block">
              Display Name
            </label>
            <input
              type="text"
              className="form-control"
              required
              ref={displayNameElRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="bold d-block">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              required
              ref={emailElRef}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="bold d-block">
              Password
            </label>
            <input
              type={isShowingPw ? "text" : "password"}
              className="form-control"
              minLength="5"
              required
              ref={pwElRef}
            />
          </div>

          {/* Password Revealer */}
          <span
            className="pw-revealer"
            onClick={togglePwRevealer}
            style={{ marginTop: "-53px" }}
          >
            {!isShowingPw && <AiFillEye />}
            {isShowingPw && <AiFillEyeInvisible />}
          </span>

          <div className="form-group mb-1">
            <label htmlFor="confirmPassword" className="bold d-block">
              Confirm Password
            </label>
            <input
              type={isShowingConfirmPw ? "text" : "password"}
              className="form-control"
              minLength="5"
              required
              id="confirmPw"
              ref={confirmPwElRef}
            />
          </div>

          {/*ConfirmPassword Revealer */}
          <span
            className="pw-revealer"
            onClick={toggleConfirmPwRevealer}
            style={{ marginTop: "-41px" }}
          >
            {!isShowingConfirmPw && <AiFillEye />}
            {isShowingConfirmPw && <AiFillEyeInvisible />}
          </span>

          {/* Error message */}
          {errMsg && (
            <small className="text-danger d-block mt-1">{errMsg}</small>
          )}

          <button type="submit" className="btn btn-primary btn-md mt-3">
            Sign Up
          </button>
        </form>
      </>
      {/* )} */}
    </>
  );
}
