import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory } from "react-router-dom";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import axios from "axios";

import {
  epicText,
  textAddWrapper,
  addIcon,
  noEpics,
} from "./styles.module.css";
import Epic from "./Epic/Epic";
import PutEpic from "./PutEpic";
import EditProject from "components/EditProject";

const Epics = ({ match }) => {
  const { text, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const setMessage = useContext(MessageContext);
  const history = useHistory();
  const [project, setProject] = useState({});

  const [putEpic, setPutEpic] = useState({
    open: false,
    title: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    const projectId = match.params.id;

    axios
      .get(`/projects/${projectId}`)
      .then((response) => {
        const project = response.data;

        document.title = `Scrumhub | ${project.title}`;
        setProject(project);
        setLoading(false);
      })
      .catch(() => {
        setMessage(textLang.project_not_found, MessageTypes.error);
        history.push("/");
      });
  }, [history, match.params.id, setMessage, textLang.project_not_found]);

  if (loading) return <PageLoading />;

  return (
    <div>
      <div className={textAddWrapper}>
        <span className={epicText}>{text.project_epics}</span>
        <Tooltip
          title={text.add_epic}
          placement="top"
          onClick={() => setPutEpic({ open: true, title: text.create_epic })}
        >
          <AddCircleOutlineIcon fontSize="large" className={addIcon} />
        </Tooltip>
      </div>

      <div>
        {project.epics.length === 0 ? (
          <span className={noEpics}>{text.project_no_epics}</span>
        ) : (
          project.epics.map((epic) => <Epic epic={epic} />)
        )}
      </div>

      <PutEpic setOpen={setPutEpic} {...putEpic} />
      <EditProject />
    </div>
  );
};

export default Epics;
