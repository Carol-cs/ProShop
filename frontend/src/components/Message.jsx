import { Alert } from "react-bootstrap";

import React from "react";

const Message = ({ variant, children }) => {
  // variant: success, danger, warning..., children: the message to be output
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  // make a default variant
  variant: "info",
};

export default Message;
