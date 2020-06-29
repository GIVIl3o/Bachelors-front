import React, { useState, useContext } from "react";

<<<<<<< HEAD
const PutSprint = ({open, setOpen, title }) => {
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Dialog>

    
            <DialogActions>

            </DialogActions>
          </Dialog>
        </MuiPickersUtilsProvider>
      );
  };

  export default PutSprint;
=======
import Slide from "@material-ui/core/Slide";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";
import axios from "axios";
import SubmitButton from "components/utils/SubmitButton";

import MenuItem from "@material-ui/core/MenuItem";
import { wrapper, input, submitWrapper, epicSelect } from "./styles.module.css";

const sendPutSprint = (
  state,
  setMessage,
  textLang,
  setOpen,
  projectId,
  setLoading,
  allSprints,
  setSprints
) => {
  if (state.title.length < 4) {
    setMessage(textLang.sprint_title_length, MessageTypes.error);
    return;
  }

  setLoading(true);
  axios.put(`/sprints?projectId=${projectId}`, state).then((response) => {
    const sprint = response.data;

    const filteredSprints = allSprints.filter((e) => e.id !== sprint.id);
    setSprints([...filteredSprints, sprint]);

    setOpen(false);
    setLoading(false);
  });
};

const PutSprint = ({
  open,
  setOpen,
  sprint,
  projectId,
  setState,
  allSprints,
  setSprints,
  project,
}) => {
  const { text, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const setMessage = useContext(MessageContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <div className={wrapper}>
        <MarginTextField
          label={text.new_sprint_name}
          color="primary"
          variant="outlined"
          value={sprint.title}
          onChange={(e) => setState({ ...sprint, title: e.target.value })}
          className={input}
          autoFocus
        />

        <MarginTextField
          select
          color="secondary"
          variant="outlined"
          className={epicSelect}
          value={sprint.epicId || "T"}
          label={text.new_sprint_epic_label}
          onChange={(e) => {
            const epicId = e.target.value === "T" ? null : e.target.value;
            setState({ ...sprint, epicId });
          }}
        >
          <MenuItem value={"T"}>
            <em>{text.new_sprint_no_epic}</em>
          </MenuItem>
          {project.epics.map((epic) => (
            <MenuItem value={epic.id} key={epic.id}>
              {epic.title}
            </MenuItem>
          ))}
        </MarginTextField>

        <div className={submitWrapper}>
          <SubmitButton
            variant="contained"
            color="primary"
            onClick={() =>
              sendPutSprint(
                sprint,
                setMessage,
                textLang,
                setOpen,
                projectId,
                setLoading,
                allSprints,
                setSprints
              )
            }
            loading={loading}
          >
            {text.epic_submit}
          </SubmitButton>
          <SubmitButton
            variant="contained"
            color="secondary"
            onClick={handleClose}
          >
            {text.epic_submit_cancel}
          </SubmitButton>
        </div>
      </div>
    </Slide>
  );
};

export default PutSprint;
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
