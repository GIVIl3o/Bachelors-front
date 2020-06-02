import React, { useContext, useState } from "react";
import { UserContext, ProjectContext } from "App";
import InputLabel from "@material-ui/core/InputLabel";

import swal from "sweetalert";
import axios from "axios";
import { MessageContext, MessageTypes } from "components/utils/Messages";

import {
  dangerTextWrapper,
  dangerText,
  dangerWrapper,
  alignEndText,
  settingsWrapper,
  settingsHeader,
  settingsExplanation,
  buttonClass,
  ownershipClass,
  ownerShipWrapper,
} from "./styles.module.css";
import { useHistory } from "react-router";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const deleteProject = (
  project,
  setProject,
  text,
  textLang,
  history,
  setMessage,
  setDeleteLoading
) => {
  swal({
    title: text.settings_delete_swal_title,
    text: text.settings_delete_swal_description,
    icon: "warning",
    buttons: [text.sweet_alert_cancel, text.swee_alert_confirm],
    dangerMode: true,
  }).then((willDelete) => {
    willDelete && setDeleteLoading(true);
    willDelete &&
      axios.delete(`/projects/${project.id}`).then(() => {
        setProject(undefined);
        setMessage(textLang.settings_project_deleted, MessageTypes.success);
        history.push("/");
      });
  });
};

const changeOwner = (
  project,
  setProject,
  text,
  textLang,
  setMessage,
  setChangeOwnerLoading
) => {
  console.log("asd");
};

const DangerZone = () => {
  const { text, textLang } = useContext(UserContext);

  const { project, setProject } = useContext(ProjectContext);

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [changeOwnerLoading, setChangeOwnerLoading] = useState(false);

  const [newOwner, setNewOwner] = useState("");

  const history = useHistory();

  const setMessage = useContext(MessageContext);

  const ownershipCandidates =
    project &&
    project.members
      .filter((m) => m.permission === "ADMIN")
      .map((m) => m.username);

  console.log(ownershipCandidates);

  return (
    <div className={dangerTextWrapper}>
      <span className={dangerText}>{text.settings_danger}</span>

      <div className={dangerWrapper}>
        {ownershipCandidates && ownershipCandidates.length > 0 && (
          <div className={settingsWrapper}>
            <div className={alignEndText}>
              <span className={settingsHeader}>
                {text.settings_transfer_ownership}
              </span>
              <span className={settingsExplanation}>
                {text.settings_transfer_ownership_description}
              </span>
            </div>

            <div className={ownerShipWrapper}>
              <FormControl
                variant="outlined"
                color="secondary"
                className={ownershipClass}
              >
                <InputLabel id="newOwner">
                  {text.settings_transfer_owner_label}
                </InputLabel>
                <Select
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  labelId="newOwner"
                  label={text.settings_transfer_owner_label}
                >
                  {ownershipCandidates.map((username) => (
                    <MenuItem value={username} key={username}>
                      {username}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <SubmitButton
                className={buttonClass}
                variant="contained"
                color="secondary"
                onClick={() =>
                  changeOwner(
                    project,
                    setProject,
                    text,
                    textLang,
                    setMessage,
                    setChangeOwnerLoading
                  )
                }
                loading={changeOwnerLoading}
              >
                {text.settings_transfer_ownership_button}
              </SubmitButton>
            </div>
          </div>
        )}

        <div className={settingsWrapper}>
          <div className={alignEndText}>
            <span className={settingsHeader}>
              {text.settings_delete_header}
            </span>
            <span className={settingsExplanation}>
              {text.settings_delete_explanation}
            </span>
          </div>
          <SubmitButton
            className={buttonClass}
            variant="contained"
            color="secondary"
            onClick={() =>
              deleteProject(
                project,
                setProject,
                text,
                textLang,
                history,
                setMessage,
                setDeleteLoading
              )
            }
            loading={deleteLoading}
          >
            {text.settings_delete_button}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
