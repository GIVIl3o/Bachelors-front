import React, { Fragment } from "react";

import { addAttachmentClass, addAttachmentText } from "./styles.module.css";

import axios from "axios";

const AddAttachment = ({ task, addAttachment }) => {
  const uploadAttachment = (e) => {
    if (e.target.files.length === 0) return;

    const formData = new FormData();
    formData.append("projectId", task.projectId);
    formData.append("attachment", e.target.files[0]);

    axios.post(`/tasks/${task.id}/attachment`, formData).then((response) => {
      addAttachment(response.data);
    });
  };

  return (
    <Fragment>
      <input
        accept="image/*, .pdf"
        style={{ display: "none" }}
        id="attachment-button"
        type="file"
        onChange={uploadAttachment}
      />
      <label htmlFor="attachment-button">
        <div className={addAttachmentClass}>
          <span className={addAttachmentText}>+</span>
        </div>
      </label>
    </Fragment>
  );
};

export default AddAttachment;
