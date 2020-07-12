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

  const sprintId = params.sprintId;

  const history = useHistory();

  const { project } = useContext(ProjectContext);
  const { text } = useContext(UserContext);

  if (!project) return <PageLoading />;

  for (const sprints of project.sprints) {
    if (sprints.id === sprintId) {
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
