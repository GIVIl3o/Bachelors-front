import React, { useEffect, useState } from "react";
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

  return (
    <div className={wrapper}>
      <AddAttachment task={task} addAttachment={addAttachment} />
      {attachments.map((attachment) => (
        <div key={attachment.id} className={attachmentClass}>
          <a
            href={attachment.url}
            download={attachment.filename}
            className={attachmentText}
          >
            <div className={linkWrapper}>
              <span className={downloadLink}>{attachment.filename}</span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default EditTaskAttachments;
