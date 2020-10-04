import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../context/user/UserState";
import Loader from "react-loader-spinner";

export default function AddTrackModal({ handleClose, open }) {
  const { user, token, addTrack, isTracking } = useContext(UserContext);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const urlElRef = useRef();
  const nameElRef = useRef();
  const expectedPriceElRef = useRef();

  function handleAddTrack(e) {
    e.preventDefault();
    const url = urlElRef.current.value;
    const name = nameElRef.current.value;
    const expectedPrice = expectedPriceElRef.current.value;

    // Check and submit
    if (url.indexOf("/ref=") === -1) {
      addTrack(user.userId, url, name, +expectedPrice, token);
    } else {
      const trimmedUrl = url.substr(0, url.indexOf("/ref="));
      const finalUrl =
        trimmedUrl.indexOf("https://") === -1
          ? `https://"${trimmedUrl}`
          : trimmedUrl;

      addTrack(user.userId, finalUrl, name, +expectedPrice, token);
    }

    // setIsSubmitting(true);
  }

  if (!isTracking && open) {
    handleClose();
    // setIsSubmitting(false);
  }

  return (
    <>
      <h2 className="bold mb-4">Track a new product</h2>
      {/* {isSubmitting && isTracking && (
        <div className="all-center-column">
          <Loader
            type="Puff"
            color="#5fb0e5"
            height={200}
            width={200}
            timeout={3000}
          />
          <span className="mt-3 text-center">
            Please wait while we are tracking the product
          </span>
        </div>
      )} */}
      {/* {!isSubmitting && ( */}
      <form className="form" onSubmit={handleAddTrack}>
        <div className="form-group">
          <label htmlFor="productUrl" className="bold d-block">
            Product URL
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Paste the Amazon product link"
            required
            ref={urlElRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="bold d-block">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Name this track"
            required
            ref={nameElRef}
          />
        </div>

        <div className="form-group mb-1">
          <label htmlFor="productUrl" className="bold d-block">
            Expected Price
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter an ideal price"
            required
            ref={expectedPriceElRef}
          />
        </div>

        <button className="btn btn-primary btn-md mt-3">Track</button>
      </form>
      {/* )} */}
    </>
  );
}
