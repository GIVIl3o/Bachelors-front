import React from "react";
import ExistingMember from "./ExistingMember";
import NewMember from "./NewMember";

import { wrapper } from "./styles.module.css";
import Slide from "@material-ui/core/Slide";

const ChangeMemberWrapepr = ({ open, state, ...props }) => {
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <div className={wrapper}>
        {state.new ? (
          <NewMember {...props} />
        ) : (
          <ExistingMember {...props} state={state} />
        )}
      </div>
    </Slide>
  );
};

export default ChangeMemberWrapepr;
