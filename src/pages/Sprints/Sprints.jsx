import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { UserContext, ProjectContext } from "App";

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
import MarginTextField from "components/utils/MarginTextField/MarginTextField";
import { MenuItem } from "@material-ui/core";
import { permissionIsAtLeast, PERMISSIONS } from "Constants";

const newSprint = {
  id: null,
  title: "",
  epicId: null,
  active: false,
};

const Sprints = ({ epicId: filterEpicId }) => {
  const { text } = useContext(UserContext);
  const { project, permission, setProject } = useContext(ProjectContext);

  const history = useHistory();

  const [openSprintEdit, setOpenSprint] = useState(false);
  const [displayAddSprint, setAddSprint] = useState(true);
  const [openedSprint, setOpenedSprint] = useState(newSprint);

  if (!project) return <PageLoading />;

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

  const sprints = project.sprints
    .filter((sprint) => !filterEpicId || sprint.epicId === filterEpicId)
    .sort((t1, t2) => t1.id - t2.id);

  const hasScrumMasterPermissions = permissionIsAtLeast(
    permission,
    PERMISSIONS.master.value
  );

  return (
    <div style={{ height: "100%" }}>
      {displayAddSprint && hasScrumMasterPermissions && (
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
            <div>
              <span className={sprintText}>{text.sprints_project_sprints}</span>
            </div>
            <div>
              <MarginTextField
                select
                color="secondary"
                variant="outlined"
                value={filterEpicId || "T"}
                label={text.sprints_filter_label}
                onChange={(e) => {
                  const currentEpicId =
                    e.target.value === "T" ? undefined : e.target.value;

                  if (currentEpicId)
                    history.push(
                      `/projects/${project.id}/sprints?epicId=${currentEpicId}`
                    );
                  else history.push(`/projects/${project.id}/sprints`);
                }}
                style={displayAddSprint ? { marginRight: "4rem" } : {}}
              >
                <MenuItem value={"T"}>
                  <em>{text.sprints_filter_by_epic}</em>
                </MenuItem>
                {project.epics.map((epic) => (
                  <MenuItem value={epic.id} key={epic.id}>
                    {epic.title}
                  </MenuItem>
                ))}
              </MarginTextField>
            </div>
          </div>

          <div className={sprintsWrapper}>
            {sprints.length === 0 ? (
              <span className={noSprints}>{text.sprints_no_sprints}</span>
            ) : (
              sprints.map((sprint) => (
                <Sprint
                  sprint={sprint}
                  key={sprint.id}
                  onOpen={(sprint) => {
                    setOpenSprint(true);
                    setAddSprint(false);
                    setOpenedSprint(sprint);
                  }}
                  selected={!displayAddSprint && sprint.id === openedSprint.id}
                  displayButtons={hasScrumMasterPermissions}
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
