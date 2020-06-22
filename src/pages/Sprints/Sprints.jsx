import React, { useEffect, useContext, useState, Fragment } from "react";
import { UserContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory } from "react-router-dom";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import EditProject from "components/EditProject";

import axios from "axios";

import {
  sprintText,
  textAddWrapper,
  addIcon,
  noSprints,
} from "./styles.module.css";

import Sprint from "./Sprint/Sprint";
import PutSprint from "./PutSprint";

const Sprints = ({ match }) => {
  const { text, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const setMessage = useContext(MessageContext);
  const history = useHistory();
  const [project, setProject] = useState({});
  const [PutSprint, setPutSprint] = useState({
    open: false,
    title: "",
    from: "",
    to: "",
  });
  /*
  return (
    <div>
      <div className={textAddWrapper}>
        <span className={sprintText}>{text.project_sprints}</span>
        <Tooltip
          title={text.add_sprint}
          placement="top"
          //   onClick={() => setPutSprint({ open: true, title: text.sprint_epic })}
        >
          <AddCircleOutlineIcon fontSize="large" className={addIcon} />
        </Tooltip>
      </div>

      <div>
        {project.sprints.length === 0 ? (
          <span className={noSprints}>{text.project_no_sprints}</span>
        ) : (
          project.sprints.map((sprint) => <Sprint sprnt={sprint} />)
        )}
      </div>

      <PutSprint setOpen={setPutSprint} {...PutSprint} />
      <EditProject />
    </div>
  );
  */
  return <span>TODO</span>;
};

export default Sprints;
