import React, { useEffect, useState, Fragment, useContext } from "react";
import AddAttachment from "./AddAttachment";

import axios from "axios";

import {
  wrapper,
  downloadLink,
  attachmentClass,
  attachmentText,
  linkWrapper,
  attachmentHeaderText,
  XWrapper,
  XClassName,
} from "./styles.module.css";
import PageLoading from "components/utils/PageLoading/PageLoading";
import ImageAttachment from "./ImageAttachment";
import { UserContext } from "App";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const EditTaskAttachments = ({ task }) => {
  const { text } = useContext(UserContext);

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

  const deleteAttachment = (id) => {
    setAttachments(attachments.filter((t) => t.id !== id));

    axios.delete(`/tasks/attachments/${id}?projectId=${task.projectId}`);
  };

  return (
    <Fragment>
      <span className={attachmentHeaderText}>
        {text.task_details_attachment_header}
      </span>
      <div className={wrapper}>
        <AddAttachment task={task} addAttachment={addAttachment} />
        {attachments.map((attachment) =>
          attachment.contentType.startsWith("image") ? (
            <ImageAttachment
              attachment={attachment}
              key={attachment.id}
              onDelete={deleteAttachment}
            />
          ) : (
            <div key={attachment.id} className={attachmentClass}>
              <div className={XWrapper}>
                <span
                  className={XClassName}
                  onClick={() => deleteAttachment(attachment.id)}
                >
                  <HighlightOffIcon />
                </span>
              </div>
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
    </Fragment>
  );
};

export default EditTaskAttachments;
