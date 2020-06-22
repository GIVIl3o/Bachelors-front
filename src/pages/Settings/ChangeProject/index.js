import React, { useState } from "react";
import ChangeProject from "./ChangeProject";
import ChangeProjectView from "./ChangeProjectView";

const ChangeProjectIndex = (props) => {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <ChangeProject {...props} setEdit={() => setEdit(false)} />
  ) : (
    <ChangeProjectView {...props} setEdit={() => setEdit(true)} />
  );
};

export default ChangeProjectIndex;
