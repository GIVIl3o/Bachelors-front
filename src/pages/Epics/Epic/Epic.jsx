import React, { useContext } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { format, addDays, isAfter } from "date-fns";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import swal from "sweetalert";
import { UserContext } from "App";
import { MessageContext, MessageTypes } from "components/utils/Messages";

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
  const setMessage = useContext(MessageContext);

  const { text, textLang } = useContext(UserContext);

  const wrapperSelectedClasses = `${wrapper} ${selected ? selectedEpic : ""}`;

  const onDeleteEpic = (e) => {
    e.stopPropagation();

    swal({
      title: text.sweet_alert_sure,
      text: text.sweet_alert_description,
      icon: "warning",
      buttons: [text.sweet_alert_cancel, text.swee_alert_confirm],
      dangerMode: true,
    }).then((willDelete) => {
      willDelete &&
        axios.delete(`/epics/${epic.id}?projectId=${projectId}`).then(() => {
          deleteEpic(epic.id);
          setMessage(textLang.epic_deleted, MessageTypes.success);
        });
    });
  };

  console.log(selected);
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
