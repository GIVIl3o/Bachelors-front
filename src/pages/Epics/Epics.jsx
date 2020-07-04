import React, { useContext, useState } from "react";
import { UserContext, ProjectContext } from "App";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

import {
  layout,
  epicText,
  textAddWrapper,
  addIcon,
  noEpics,
  addIconWrapper,
  epicsWrapper,
} from "./styles.module.css";
import Epic from "./Epic/Epic";
import PutEpic from "./PutEpic";
import { addDays } from "date-fns";
import { permissionIsAtLeast, PERMISSIONS } from "Constants";
const minDateDistanceDays = 7;

const newEpic = {
  id: null,
  title: "",
  fromDate: new Date(),
  toDate: addDays(new Date(), minDateDistanceDays),
};

const Epics = () => {
  const { text } = useContext(UserContext);

  const { project, permission, setProject } = useContext(ProjectContext);

  const [openEpicEdit, setOpenEpic] = useState(false);
  const [displayAddEpic, setAddEpic] = useState(true);
  const [openedEpic, setOpenedEpic] = useState(newEpic);

  if (!project) return <PageLoading />;

  const epicComparator = (t1, t2) => t1.id - t2.id;

  const onEpicOpenChange = (openDialog) => {
    if (openDialog) {
      setAddEpic(false);
      setOpenEpic(true);
    } else {
      setTimeout(() => {
        setAddEpic(true);
      }, 200);
      setOpenEpic(false);
    }
  };

  const setEpics = (epics) => setProject({ ...project, epics });

  const deleteEpic = (id) => {
    const filteredEpics = project.epics.filter((e) => e.id !== id);

    const removeEpicIdFromSprints = (sprint) =>
      sprint.epicId === id ? null : sprint.epicId;

    const unconnectSprints = project.sprints.map((sprint) => ({
      ...sprint,
      epicId: removeEpicIdFromSprints(sprint),
    }));

    setProject({ ...project, epics: filteredEpics, sprints: unconnectSprints });

    if (id === openedEpic.id) {
      onEpicOpenChange(false);
    }
  };

  const hasScrumMasterPermissions = permissionIsAtLeast(
    permission,
    PERMISSIONS.master.value
  );

  return (
    <div style={{ height: "100%" }}>
      {displayAddEpic && hasScrumMasterPermissions && (
        <div className={addIconWrapper}>
          <Tooltip
            title={text.add_epic}
            placement="top"
            onClick={() => {
              onEpicOpenChange(true);
              setOpenedEpic(newEpic);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" className={addIcon} />
          </Tooltip>
        </div>
      )}
      <div className={layout}>
        <div>
          <div className={textAddWrapper} style={{ display: "absolute" }}>
            <span className={epicText}>{text.project_epics}</span>
          </div>

          <div className={epicsWrapper}>
            {project.epics.length === 0 ? (
              <span className={noEpics}>{text.project_no_epics}</span>
            ) : (
              project.epics.sort(epicComparator).map((epic) => (
                <Epic
                  epic={epic}
                  key={epic.id}
                  onOpen={(epic) => {
                    setOpenEpic(true);
                    setAddEpic(false);
                    setOpenedEpic(epic);
                  }}
                  selected={!displayAddEpic && epic.id === openedEpic.id}
                  deleteEpic={deleteEpic}
                  projectId={project.id}
                  displayButtons={hasScrumMasterPermissions}
                />
              ))
            )}
          </div>
        </div>
        <PutEpic
          open={openEpicEdit}
          setOpen={onEpicOpenChange}
          projectId={project.id}
          epic={{ ...openedEpic }}
          setState={setOpenedEpic}
          allEpics={project.epics}
          setEpics={setEpics}
        />
      </div>
    </div>
  );
};

export default Epics;
