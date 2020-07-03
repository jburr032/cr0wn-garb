import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? "inverted" : ""} custom-button`}
    style={{ backgroundColor: isGoogleSignIn ? "#4285f4" : "" }}
    {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
