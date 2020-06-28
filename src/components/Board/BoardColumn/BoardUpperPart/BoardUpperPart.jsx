import React, { useContext, Fragment } from "react";
import { UserContext } from "App";

import { PROGRESS } from "Constants";

import {
  columnText,
  headerWrapper,
  collapseIcon,
  wrapper,
  collapsedWrapper,
  collapsedTextWrapper,
  expandIcon,
  collapseTextWrapperDiv,
  addIconClass,
} from "./styles.module.css";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

const BoardColumn = ({
  tasks,
  progressColumnName,
  collapsedUpperPart,
  setCollapsedUpperPart,
  setAddTask,
}) => {
  const { text } = useContext(UserContext);

  return (
    <Fragment>
      {collapsedUpperPart === true ? (
        <div
          className={collapsedWrapper}
          style={{ backgroundColor: PROGRESS[progressColumnName].color }}
        >
          <Tooltip
            placement="top"
            title={text.board_column_expand}
            className={expandIcon}
          >
            <KeyboardArrowDownIcon
              onClick={() => {
                console.log("zevita");
                setAddTask(false);
                setCollapsedUpperPart(false);
              }}
            />
          </Tooltip>
          <div className={collapseTextWrapperDiv}>
            <span className={collapsedTextWrapper}>
              {text[PROGRESS[progressColumnName].text]}
            </span>
          </div>
        </div>
      ) : (
        <div className={wrapper} key={progressColumnName}>
          <div
            className={headerWrapper}
            style={{ backgroundColor: PROGRESS[progressColumnName].color }}
          >
            <Tooltip
              placement="top"
              title={text.board_column_wrap}
              className={collapseIcon}
            >
              <KeyboardArrowRightIcon
                onClick={() => {
                  console.log("qvevita");
                  setCollapsedUpperPart(true);
                }}
              />
            </Tooltip>
            <span className={columnText}>
              {text[PROGRESS[progressColumnName].text]}
            </span>
            <Tooltip
              placement="top"
              title={text.board_add_task}
              className={addIconClass}
            >
              <AddIcon onClick={() => setAddTask(true)} />
            </Tooltip>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BoardColumn;
