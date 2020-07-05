import React, { Fragment, useContext } from "react";

import { UserContext } from "App";

import {
  ownerTextWrapper,
  ownerText,
  ownerWrapper,
  noOwnerText,
  noOwnerTextWrapper,
} from "./styles.module.css";
import MemberAvatar from "components/MemberAvatar/MemberAvatar";
import { PERMISSIONS } from "Constants";

const ProjectProductOwner = ({ project, editUsername, editable }) => {
  const { text } = useContext(UserContext);

  const owner = project.members.find(
    (t) => t.permission === PERMISSIONS.owner.value
  );

  return (
    <Fragment>
      <div className={ownerTextWrapper}>
        <span className={ownerText}>{text.settings_product_owner}</span>
      </div>
      <div className={ownerWrapper}>
        {owner && (
          <MemberAvatar
            id={owner.username}
            onClick={() => {
              if (editable) editUsername(owner.username);
            }}
          />
        )}
        {owner === undefined && (
          <div className={noOwnerTextWrapper}>
            <span className={noOwnerText}>
              {text.settings_no_product_owner}
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProjectProductOwner;
