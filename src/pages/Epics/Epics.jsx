import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { useHistory, useParams } from "react-router-dom";
import PageLoading from "components/utils/PageLoading";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";
import data from "../Sprints/test_sprint.json"

import axios from "axios";

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
import { format, addDays, isAfter, parseISO, compareAsc } from "date-fns";

const minDateDistanceDays = 7;

const newEpic = {
  id: null,
  title: "",
  fromDate: new Date(),
  toDate: addDays(new Date(), minDateDistanceDays),
};

const Epics = () => {
  const { text, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const setMessage = useContext(MessageContext);
  const history = useHistory();
  const [project, setProject] = useState({});
  const { id: projectId } = useParams();

  const [openEpicEdit, setOpenEpic] = useState(false);
  const [displayAddEpic, setAddEpic] = useState(true);
  const [openedEpic, setOpenedEpic] = useState(newEpic);

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
        setLoading(false);
      })
      .catch(() => {
        setMessage(textLang.project_not_found, MessageTypes.error);
        history.push("/");
      });
  }, [history, projectId, setMessage, textLang.project_not_found]);

  
  if (loading) return <PageLoading />;

  const epicComparator = (e1, e2) => compareAsc(e1.fromDate, e2.fromDate);

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
    setProject({ ...project, epics: filteredEpics });

    if (id === openedEpic.id) {
      onEpicOpenChange(false);
    }
  };

  return (
    <div>
      {displayAddEpic && (
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
                    console.log(epic);
                    setOpenEpic(true);
                    setAddEpic(false);
                    setOpenedEpic(epic);
                  }}
                  selected={!displayAddEpic && epic.id === openedEpic.id}
                  deleteEpic={deleteEpic}
                  projectId={project.id}
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
