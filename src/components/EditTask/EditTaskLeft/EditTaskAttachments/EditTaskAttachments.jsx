import React, { useEffect, useState, Fragment } from "react";
import AddAttachment from "./AddAttachment";

import axios from "axios";

import {
  wrapper,
  downloadLink,
  attachmentClass,
  attachmentText,
  linkWrapper,
} from "./styles.module.css";
import PageLoading from "components/utils/PageLoading/PageLoading";
import ImageAttachment from "./ImageAttachment";

const EditTaskAttachments = ({ task }) => {
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/tasks/${task.id}/attachments?projectId=${task.projectId}`)
      .then((response) => {
        const attachments = response.data;
        attachments.sort((t1, t2) => t1.id - t2.id);
        setAttachments(attachments);
        setLoading(false);
      });
  }, [task.id]);

  const addAttachment = (attachment) => {
    setAttachments([...attachments, attachment]);
  };

  if (loading) return <PageLoading />;

  const getMiddleText = (contentType) => {
    const splitted = contentType.split("/");
    return splitted.length === 1 ? splitted : splitted[1];
  };

  return (
    <div className={wrapper}>
      <AddAttachment task={task} addAttachment={addAttachment} />
      {attachments.map((attachment) =>
        attachment.contentType.startsWith("image") ? (
          <ImageAttachment attachment={attachment} key={attachment.id} />
        ) : (
          <div key={attachment.id} className={attachmentClass}>
            <a
              href={attachment.url}
              download={attachment.filename}
              className={attachmentText}
            >
              <div className={linkWrapper}>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "1.8rem" }}>
                    {getMiddleText(attachment.contentType)}
                  </span>
                </div>
                <span className={downloadLink}>{attachment.filename}</span>
              </div>
            </a>
          </div>
        )
      )}
    </div>
  );
};

export default EditTaskAttachments;
