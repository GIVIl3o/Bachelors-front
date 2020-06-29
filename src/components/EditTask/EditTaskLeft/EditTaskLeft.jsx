import React from "react";

import {} from "./styles.module.css";
import EditDescription from ".//EditTaskDescription";
<<<<<<< HEAD
=======
import EditTaskAttachments from "./EditTaskAttachments/EditTaskAttachments";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

const EditTaskLeft = ({ task }) => {
  return (
    <div>
      <EditDescription task={task} />
<<<<<<< HEAD
=======
      <EditTaskAttachments task={task} />
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
    </div>
  );
};

export default EditTaskLeft;
