import React from "react";

import {
  wrapper,
  imgWrapper,
  linkWrapper,
  XWrapper,
  XClassName,
} from "./styles.module.css";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const ImageAttachment = ({ attachment, onDelete }) => {
  return (
    <div className={wrapper}>
      <div className={XWrapper}>
        <span className={XClassName} onClick={() => onDelete(attachment.id)}>
          <HighlightOffIcon />
        </span>
      </div>
      <a
        href={attachment.url}
        download={attachment.filename}
        className={linkWrapper}
      >
        <img src={attachment.url} className={imgWrapper} alt="" />
      </a>
    </div>
  );
};

export default ImageAttachment;
