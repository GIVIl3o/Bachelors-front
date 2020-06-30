import React from "react";

import { wrapper, imgWrapper, linkWrapper } from "./styles.module.css";

const ImageAttachment = ({ attachment }) => {
  console.log(attachment.url);
  return (
    <div className={wrapper}>
      <a
        href={attachment.url}
        download={attachment.filename}
        className={linkWrapper}
      >
        <img src={attachment.url} className={imgWrapper} />
      </a>
    </div>
  );
};

export default ImageAttachment;
