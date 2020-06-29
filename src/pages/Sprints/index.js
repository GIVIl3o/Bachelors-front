<<<<<<< HEAD
import React, { Fragment } from "react";

import Sprints from "./Sprints";

const toExport = ({ match, ...props }) => {
  if (match.type === "none" || match.type === "outOfView") return <Fragment />;
  return <Sprints match={match} {...props} />;
};

export default toExport;
=======
import React, { useContext } from "react";
import Sprints from "./Sprints";
import { useLocation, useHistory } from "react-router";
import { ProjectContext, UserContext } from "App";
import Board from "components/Board/Board";
import PageLoading from "components/utils/PageLoading/PageLoading";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Tooltip } from "@material-ui/core";

const getSprintId = (location) => {
  const search = location.search;

  const queries = search.substring(1);
  const parsedQueries = queries.split("&");

  const params = {};

  for (const query of parsedQueries) {
    const splitted = query.split("=");
    const value = parseInt(splitted[1]);

    if (!isNaN(value)) params[splitted[0]] = value;
  }

  return params;
};

const SprintWrapper = (props) => {
  const location = useLocation();

  const params = getSprintId(location);
  console.log(params);

  const sprintId = params.sprintId;

  const history = useHistory();

  const { project } = useContext(ProjectContext);
  const { text } = useContext(UserContext);

  if (!project) return <PageLoading />;

  for (const sprints of project.sprints) {
    if (sprints.id === sprintId) {
      console.log(project.tasks);
      const tasks = project.tasks.filter((task) => task.sprintId === sprintId);

      return (
        <div
          style={{
            height: "100%",
            display: "grid",
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div>
            <Tooltip placement="top" title={text.board_go_back_to_sprints}>
              <KeyboardBackspaceIcon
                fontSize="large"
                onClick={() => history.push(`/projects/${project.id}/sprints`)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </div>
          <Board tasks={tasks} sprintId={sprintId} />
        </div>
      );
    }
  }

  return <Sprints {...props} epicId={params.epicId} />;
};

export default SprintWrapper;
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
