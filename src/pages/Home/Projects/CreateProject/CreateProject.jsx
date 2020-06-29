import React, { Fragment, useState, useContext, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import { IconButton } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import {
  input,
  textPadding,
  addMemberWrapper,
  memberSelector,
  margin,
  cursorPointer,
  member,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar";

const defaultState = {
  title: "",
  description: "",
  members: [],
  selectedMember: "",
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const sendCreateProject = (
  state,
  setMessage,
  text,
  textLang,
  history,
  setProject
) => {
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
    const project = { ...toSend, id: response.data, epics: [] };
    setProject(project);
    history.push(`/projects/${response.data}/epics`);

    Swal.fire({
      title: text.project_created_sweet_title,
      text: text.project_created_sweet_desc,
      confirmButtonText: text.swal_ok,
      icon: "success",
    });
  });
};

const CreateProject = ({ open, setOpen }) => {
<<<<<<< HEAD
  const { imageBase, username, text, textLang } = useContext(UserContext);
=======
  const { username, text, textLang } = useContext(UserContext);
>>>>>>> d244be303c08d92b707807095df537e6a45d66ba
  const { setProject } = useContext(ProjectContext);

  const history = useHistory();

  const selectedMemberPermission = textLang.permissions_member["ENUM"];

  const [state, setState] = useState({
    ...defaultState,
    selectedMemberPermission,
  });
  const [usernames, setUsernames] = useState([]);

  const setMessage = useContext(MessageContext);

  const handleClose = () => {
    const selectedMemberPermission = textLang.permissions_member["ENUM"];
    setState({ ...defaultState, selectedMemberPermission });
    setOpen(false);
  };

  const addMember = () => {
    const newMember = {
      username: state.selectedMember,
      permission: state.selectedMemberPermission,
    };

    if (usernames.includes(state.selectedMember)) {
      setUsernames(usernames.filter((i) => i !== state.selectedMember));
      setState({
        ...state,
        selectedMember: "",
        selectedMemberPermission: textLang.permissions_member["ENUM"],
        members: [...state.members, newMember],
      });
    } else {
      setMessage(textLang.username_not_found, MessageTypes.warning);
    }
  };

  useEffect(() => {
    if (open) {
      axios.get("/users").then((response) => {
        var usernames = response.data;

        setUsernames(usernames.filter((i) => i !== username));
      });
    }
  }, [open, username]);

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          {text.create_project}
        </DialogTitle>
        <DialogContent>
          <MarginTextField
            autoFocus
            fullWidth
            value={state.title}
            onChange={(e) => setState({ ...state, title: e.target.value })}
            color="primary"
            variant="outlined"
            label={text.create_project_title}
            className={input}
            style={{ marginTop: "0rem" }}
            required
          />

          <div className={addMemberWrapper}>
            <Autocomplete
              options={usernames}
              renderInput={(params) => (
                <MarginTextField
                  {...params}
                  label={text.create_project_add_members}
                  variant="outlined"
                  value={state.selectedMember}
                />
              )}
              onInputChange={(e, val, reason) => {
                // unless you know what you are doing. Please don't touch this...
                if (reason === "clear") {
                  setState({ ...state, selectedMember: "" });
                  return;
                }
                if (reason === "reset") {
                  if (usernames.includes(val))
                    setState({ ...state, selectedMember: val });
                  return;
                }
                setState({ ...state, selectedMember: val });
              }}
              className={memberSelector}
              inputValue={state.selectedMember}
            />
            <FormControl variant="outlined" color="secondary">
              <Select
                value={state.selectedMemberPermission}
                onChange={(e) =>
                  setState({
                    ...state,
                    selectedMemberPermission: e.target.value,
                  })
                }
                className={margin}
              >
                <MenuItem value={textLang.permissions_member["ENUM"]}>
                  {text.permissions_member}
                </MenuItem>
                <MenuItem value={textLang.permissions_administrator["ENUM"]}>
                  {text.permissions_administrator}
                </MenuItem>
              </Select>
            </FormControl>
            <AddCircleOutlineIcon
              fontSize={"large"}
              className={cursorPointer}
              onClick={addMember}
            />
          </div>

          <div>
            {state.members.map((user) => (
              <MemberAvatar
                id={user.username}
                className={member}
                key={user.username}
              />
              //<RenderMember {...user} key={user.username} />
            ))}
          </div>

          <MarginTextField
            label={text.create_project_description}
            multiline
            rows="5"
            fullWidth
            variant="outlined"
            color="secondary"
            value={state.description}
            className={input}
            onChange={(e) =>
              e.target.value.length <= 300
                ? setState({ ...state, description: e.target.value })
                : setMessage(
                    textLang.create_project_description_too_long,
                    MessageTypes.warning
                  )
            }
            inputProps={{ className: textPadding }}
            required
          />
        </DialogContent>

        <DialogActions>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" color="secondary" />
          </IconButton>
          <IconButton
            onClick={() => {
              sendCreateProject(
                state,
                setMessage,
                text,
                textLang,
                history,
                setProject
              );
            }}
          >
            <DoneIcon fontSize="large" color="primary" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateProject;
