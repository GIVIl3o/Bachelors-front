import React, { useEffect, useContext } from "react";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import { parseISO } from "date-fns";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory } from "react-router";
import PageLoading from "components/utils/PageLoading";

const ChangeProject = () => {
  const { textLang } = useContext(UserContext);

  const setMessage = useContext(MessageContext);
  const { project, setProject } = useContext(ProjectContext);

  return <h2>asd</h2>;
};

export default ChangeProject;
