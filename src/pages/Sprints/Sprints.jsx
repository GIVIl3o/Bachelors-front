import React, { useEffect, useContext, useState, Fragment } from "react";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory } from "react-router-dom";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext, ProjectContext } from "App";
import { addDays, parseISO, compareAsc } from "date-fns";

import axios from "axios";

import {
  addIcon,
  addIconWrapper,
  layout,
  textAddWrapper,
  sprintText,
  sprintsWrapper,
  noSprints,
} from "./styles.module.css";

import Sprint from "./Sprint";
import PutSprint from "./PutSprint";

const newSprint = {
  id: null,
  title: "",
  epicId: null,
  active: false,
};

const Sprints = ({ match }) => {
  const { text, textLang } = useContext(UserContext);

  const setMessage = useContext(MessageContext);

  const { project, setProject } = useContext(ProjectContext);

  const projectId = match.params.id;

  const [openSprintEdit, setOpenSprint] = useState(false);
  const [displayAddSprint, setAddSprint] = useState(true);
  const [openedSprint, setOpenedSprint] = useState(newSprint);

  useEffect(() => {
    axios
      .get(`/projects/${projectId}`)
      .then((response) => {
        const project = response.data;

        document.title = `Scrumhub | ${project.title}`;
        const epics = project.epics.map((epic) => ({
          ...epic,
          fromDate: parseISO(epic.fromDate),
          toDate: parseISO(epic.toDate),
        }));

        setProject({ ...project, epics });
      })
      .catch(() => {
        setMessage(textLang.project_not_found, MessageTypes.error);
      });
  }, [projectId]);

  if (!project || projectId != project.id) return <PageLoading />;

  const onSprintOpenChange = (openDialog) => {
    if (openDialog) {
      setAddSprint(false);
      setOpenSprint(true);
    } else {
      setTimeout(() => {
        setAddSprint(true);
      }, 200);
      setOpenSprint(false);
    }
  };
  const setSprints = (sprints) => setProject({ ...project, sprints });

  return (
    <div style={{ height: "100%" }}>
      {displayAddSprint && (
        <div className={addIconWrapper}>
          <Tooltip
            title={text.add_sprint}
            placement="top"
            onClick={() => {
              onSprintOpenChange(true);
              setOpenedSprint(newSprint);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" className={addIcon} />
          </Tooltip>
        </div>
      )}

      <div className={layout}>
        <div>
          <div className={textAddWrapper} style={{ display: "absolute" }}>
            <span className={sprintText}>{text.sprints_project_sprints}</span>
          </div>

          <div className={sprintsWrapper}>
            {project.sprints.length === 0 ? (
              <span className={noSprints}>{text.sprints_no_sprints}</span>
            ) : (
              project.sprints.map((sprint) => (
                <Sprint
                  sprint={sprint}
                  key={sprint.id}
                  onOpen={(sprint) => {
                    setOpenSprint(true);
                    setAddSprint(false);
                    setOpenedSprint(sprint);
                  }}
                  selected={!displayAddSprint && sprint.id === openedSprint.id}
                />
              ))
            )}
          </div>
        </div>

        <PutSprint
          open={openSprintEdit}
          setOpen={onSprintOpenChange}
          projectId={project.id}
          sprint={{ ...openedSprint }}
          setState={setOpenedSprint}
          allSprints={project.sprints}
          setSprints={setSprints}
          project={project}
        />
      </div>
    </div>
  );
};

export default Sprints;
