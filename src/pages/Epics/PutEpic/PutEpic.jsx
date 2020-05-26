import React, { useState, useContext } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { IconButton } from "@material-ui/core";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import {} from "./styles.module.css";

const defaultState = {
  title: "",
  description: "",
  members: [],
  selectedMember: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const sendCreateProject = (state, setMessage, textLang, history) => {
  if (state.title.length < 4) {
    setMessage(textLang.project_title_min, MessageTypes.error);
    return;
  }
  if (state.description.length < 10) {
    setMessage(textLang.project_description_min, MessageTypes.error);
    return;
  }

  const { selectedMember, selectedMemberPermission, ...toSend } = state;

  axios.put("/projects", toSend).then((response) => {
    history.push(`/projects/${response.data}`);
  });
};

const PutEpic = ({ open, setOpen, title }) => {
  const { text, textLang } = useContext(UserContext);
  const history = useHistory();

  const selectedMemberPermission = textLang.permissions_member["ENUM"];

  const [state, setState] = useState({
    ...defaultState,
    selectedMemberPermission,
  });

  const setMessage = useContext(MessageContext);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleClose = () => {
    const selectedMemberPermission = textLang.permissions_member["ENUM"];
    setState({ ...defaultState, selectedMemberPermission });
    setOpen(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
        <DialogContent>
          <MarginTextField
            autoFocus
            fullWidth
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            color="primary"
            variant="outlined"
            label={text.epic_name}
            style={{ marginTop: "0rem" }}
            required
          />

          <DatePicker
            disablePast
            autoOk
            label="Basic example"
            inputVariant="outlined"
            value={selectedDate}
            onChange={setSelectedDate}
            format="dd/MM/yyyy"
            animateYearScrolling
          />
        </DialogContent>

        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => {
              console.log(state);
              sendCreateProject(state, setMessage, textLang, history);
            }}
          >
            <DoneIcon fontSize="large" color="primary" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default PutEpic;
