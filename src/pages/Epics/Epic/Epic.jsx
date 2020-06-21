import React, { useContext } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
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
  noSprints,
} from "./styles.module.css";

const dateFormat = "dd.MM.yyyy";

const Epic = ({ epic, onOpen, selected, deleteEpic, projectId }) => {
  const from = format(new Date(epic.fromDate), dateFormat);
  const to = format(new Date(epic.toDate), dateFormat);

  const { text } = useContext(UserContext);

  const wrapperSelectedClasses = `${wrapper} ${selected ? selectedEpic : ""}`;

  const onDeleteEpic = (e) => {
    e.stopPropagation();

    Swal.fire({
      title: text.sweet_alert_sure,
      text: text.sweet_alert_description,
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
  );
};

export default Epic;
