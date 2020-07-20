import React, { useState, useContext } from "react";
import { UserContext } from "App";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import axios from "axios";
import TextFieldPassword from "components/utils/TextFieldPassword/TextFieldPassword";
import SubmitButton from "components/utils/SubmitButton/SubmitButton";

import {
  wrapper,
  avatarWrapper,
  avatarTextWrapper,
  usernameText,
  passwordChangeWrapper,
  passwordChangeLowerWrapper,
} from "./styles.module.css";
import { MessageContext } from "components/utils/Messages/Messages";
import { MessageTypes } from "components/utils/Messages/Messages";
import { useEffect } from "react";

const User = () => {
  const [passwordState, setPasswordState] = useState({
    old: "",
    new: "",
    newRepeat: "",
  });
  const [loading, setLoading] = useState(false);

  const {
    username,
    text,
    textLang,
    userImageVersion,
    changeUserImage,
  } = useContext(UserContext);

  useEffect(() => {
    document.title = `Scrumhub | ${username}`;
  });

  const setMessage = useContext(MessageContext);

  const changeImage = (e) => {
    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append("avatar", image);

    axios.post(`/user/avatar`, formData).then(() => {
      changeUserImage();
    });
  };

  const changePassword = () => {
    if (passwordState.new !== passwordState.newRepeat) {
      setMessage(textLang.user_new_passwords_mismatch, MessageTypes.error);
      return;
    }
    if (passwordState.new.length < 4) {
      setMessage(textLang.user_new_password_too_small, MessageTypes.error);
      return;
    }

    setLoading(true);

    axios
      .post(
        `/user/password?oldPassword=${passwordState.old}&newPassword=${passwordState.newRepeat}`
      )
      .then(() => {
        setLoading(false);
        setMessage(textLang.user_password_change_success, MessageTypes.success);
      })
      .catch(() => {
        setLoading(false);
        setMessage(textLang.user_old_password_mismatch, MessageTypes.error);
      });
  };

  return (
    <div className={wrapper}>
      <div className={avatarWrapper}>
        <div>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            onChange={changeImage}
          />
          <label htmlFor="contained-button-file">
            <MemberAvatar id={username} version={userImageVersion} />
          </label>
        </div>
        <div className={avatarTextWrapper}>
          <span className={usernameText}>{username}</span>
        </div>
      </div>
      <div className={passwordChangeWrapper}>
        <div className={passwordChangeLowerWrapper}>
          <TextFieldPassword
            variant="outlined"
            label={text.user_password_old}
            onChange={(e) =>
              setPasswordState({ ...passwordState, old: e.target.value })
            }
            value={passwordState.old}
          />
          <TextFieldPassword
            variant="outlined"
            label={text.user_password_new}
            onChange={(e) =>
              setPasswordState({ ...passwordState, new: e.target.value })
            }
            value={passwordState.new}
          />
          <TextFieldPassword
            variant="outlined"
            label={text.user_password_repeat_new}
            onChange={(e) =>
              setPasswordState({ ...passwordState, newRepeat: e.target.value })
            }
            value={passwordState.newRepeat}
          />

          <SubmitButton
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              changePassword();
            }}
            loading={loading}
          >
            {text.user_password_change_button}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};

export default User;
