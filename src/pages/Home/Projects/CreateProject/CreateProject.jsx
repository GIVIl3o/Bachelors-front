import React, { Fragment, useState, useContext, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MenuItem from "@material-ui/core/MenuItem";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext, ProjectContext } from "App";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { PERMISSIONS } from "Constants";

import {
  input,
  textPadding,
  addMemberWrapper,
  memberSelector,
  margin,
  cursorPointer,
  member,
  actionsWrapper,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";

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
  setProject,
  username,
  setLoading
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
  setLoading(true);

  axios.post("/projects", toSend).then((response) => {
    setLoading(false);
    const project = {
      ...toSend,
      id: response.data,
      epics: [],
      sprints: [],
      tasks: [],
      members: [
        ...toSend.members,
        { username, permission: PERMISSIONS.admin.value },
      ],
    };
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
  const { username, text, textLang } = useContext(UserContext);
  const { setProject } = useContext(ProjectContext);

  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const selectedMemberPermission = PERMISSIONS.developer.value;

  const [state, setState] = useState({
    ...defaultState,
    selectedMemberPermission,
  });
  const [usernames, setUsernames] = useState([]);

  const setMessage = useContext(MessageContext);

  const handleClose = () => {
    const selectedMemberPermission = PERMISSIONS.developer.value;
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
        selectedMemberPermission: PERMISSIONS.developer.value,
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
            <MarginTextField
              select
              variant="outlined"
              color="secondary"
              className={margin}
              value={state.selectedMemberPermission}
              onChange={(e) => {
                if (e.target.value === PERMISSIONS.owner.value) {
                  if (
                    state.members.find(
                      (member) => member.permission === PERMISSIONS.owner.value
                    )
                  ) {
                    setMessage(
                      textLang.create_project_adding_second_product_owner,
                      MessageTypes.warning
                    );
                    return;
                  }
                }
                setState({
                  ...state,
                  selectedMemberPermission: e.target.value,
                });
              }}
            >
              {Object.keys(PERMISSIONS)
                .filter((t) => PERMISSIONS[t].value !== PERMISSIONS.admin.value)
                .map((permission) => (
                  <MenuItem
                    value={PERMISSIONS[permission].value}
                    key={permission}
                  >
                    {text[PERMISSIONS[permission].text]}
                  </MenuItem>
                ))}
            </MarginTextField>

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
                onClick={() => {
                  const newMembers = state.members.filter(
                    (member) => member.username !== user.username
                  );
                  setState({ ...state, members: newMembers });
                  setUsernames([...usernames, user.username]);
                }}
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
          <div className={actionsWrapper}>
            <SubmitButton
              variant="contained"
              color="secondary"
              onClick={handleClose}
              loading={loading}
            >
              {text.epic_submit_cancel}
            </SubmitButton>
            <SubmitButton
              variant="contained"
              color="primary"
              loading={loading}
              onClick={() => {
                sendCreateProject(
                  state,
                  setMessage,
                  text,
                  textLang,
                  history,
                  setProject,
                  username,
                  setLoading
                );
              }}
            >
              {text.epic_submit}
            </SubmitButton>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateProject;
