import React, { useContext } from "react";
<<<<<<< HEAD
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
=======
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
import { format } from "date-fns";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "App";

import {
  wrapper,
  fontWeight,
  headerWrapper,
  textWrapper,
  selectedEpic,
  deleteEpicClass,
<<<<<<< HEAD
  noSprints,
} from "./styles.module.css";
=======
} from "./styles.module.css";
import { useHistory } from "react-router";
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba

const dateFormat = "dd.MM.yyyy";

const Epic = ({ epic, onOpen, selected, deleteEpic, projectId }) => {
  const from = format(new Date(epic.fromDate), dateFormat);
  const to = format(new Date(epic.toDate), dateFormat);

  const { text } = useContext(UserContext);

<<<<<<< HEAD
=======
  const history = useHistory();

>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
  const wrapperSelectedClasses = `${wrapper} ${selected ? selectedEpic : ""}`;

  const onDeleteEpic = (e) => {
    e.stopPropagation();

    Swal.fire({
<<<<<<< HEAD
      title: text.sweet_alert_sure,
      text: text.sweet_alert_description,
=======
      title: text.swal_epic_delete_title,
      text: text.swal_epic_delete_description,
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: text.sweet_alert_cancel,
      reverseButtons: true,
      confirmButtonText: text.swee_alert_confirm,
      focusCancel: true,
    }).then(({ value: willDelete }) => {
      willDelete &&
        axios.delete(`/epics/${epic.id}?projectId=${projectId}`).then(() => {
          deleteEpic(epic.id);
          Swal.fire({
            title: text.epic_deleted,
            icon: "success",
            reverseButtons: true,
            confirmButtonText: text.swee_alert_confirm,
          });
        });
    });
  };

  return (
<<<<<<< HEAD
    <ExpansionPanel className={wrapperSelectedClasses}>
      <ExpansionPanelSummary
        expandIcon={
          <ArrowDropDownIcon fontSize="large" style={{ color: "black" }} />
        }
      >
        <div className={headerWrapper}>
          <div className={textWrapper}>
            <span className={fontWeight}>{epic.title}</span>

            <span style={{ marginLeft: "0.8rem" }}>{`(${from} - `}</span>

            <span className={fontWeight}>{`${to}`}</span>
            <span>)</span>
          </div>
          <div className={deleteEpicClass}>
            <DeleteForeverIcon fontSize="large" onClick={onDeleteEpic} />
          </div>
          <div style={selected ? { visibility: "hidden" } : {}}>
            <MoreHorizIcon
              fontSize="large"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(epic);
              }}
            />
          </div>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      {/* if epic has no sprints, show no sprints text */}

        <span>TODO: add sprints here</span>
      </ExpansionPanelDetails>
    </ExpansionPanel>
=======
    <div
      className={wrapperSelectedClasses}
      onClick={() =>
        history.push(`/projects/${projectId}/sprints?epicId=${epic.id}`)
      }
    >
      <div className={headerWrapper}>
        <div className={textWrapper}>
          <span className={fontWeight}>{epic.title}</span>

          <span style={{ marginLeft: "0.8rem" }}>{`(${from} - `}</span>

          <span className={fontWeight}>{`${to}`}</span>
          <span>)</span>
        </div>
        <div className={deleteEpicClass}>
          <DeleteForeverIcon fontSize="large" onClick={onDeleteEpic} />
        </div>
        <div style={selected ? { visibility: "hidden" } : {}}>
          <MoreHorizIcon
            fontSize="large"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(epic);
            }}
          />
        </div>
      </div>
    </div>
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
  );
};

export default Epic;
