import React, { useState, useContext } from "react";

import Slide from "@material-ui/core/Slide";
import MarginTextField from "components/utils/MarginTextField";
import { MessageContext, MessageTypes } from "components/utils/Messages";
import { UserContext } from "App";
import axios from "axios";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import SubmitButton from "components/utils/SubmitButton";

import { wrapper, input, submitWrapper } from "./styles.module.css";
import { max as geMaxDate, addDays, isAfter, parseISO } from "date-fns";

const minDateDistanceDays = 7;
const dateFormat = "dd/MM/yyyy";

const sendPutEpic = (
  state,
  setMessage,
  textLang,
  setOpen,
  projectId,
  setLoading,
  allEpics,
  setEpics
) => {
  if (state.title.length < 4) {
    setMessage(textLang.epic_title_short, MessageTypes.error);
    return;
  }

  setLoading(true);
  axios.put(`/epics?projectId=${projectId}`, state).then((response) => {
    const responseEpic = response.data;

    const epic = {
      ...responseEpic,
      fromDate: parseISO(responseEpic.fromDate),
      toDate: parseISO(responseEpic.toDate),
    };

    const filteredEpics = allEpics.filter((e) => e.id !== epic.id);
    setEpics([...filteredEpics, epic]);

    setOpen(false);
    setLoading(false);
  });
};

const PutEpic = ({
  open,
  setOpen,
  epic,
  projectId,
  setState,
  allEpics,
  setEpics,
}) => {
  const { text, textLang } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const setMessage = useContext(MessageContext);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Slide direction="left" in={open} mountOnEnter unmountOnExit>
        <div className={wrapper}>
          <MarginTextField
            label={text.epic_name}
            color="primary"
            variant="outlined"
            value={epic.title}
            onChange={(e) => setState({ ...epic, title: e.target.value })}
            className={input}
            autoFocus
          />
          <DatePicker
            autoOk
            label={text.epic_from_date}
            inputVariant="outlined"
            value={epic.fromDate}
            onChange={(fromDate) => {
              if (
                isAfter(addDays(fromDate, minDateDistanceDays), epic.toDate)
              ) {
                setState({
                  ...epic,
                  fromDate,
                  toDate: addDays(fromDate, minDateDistanceDays),
                });
              } else {
                setState({ ...epic, fromDate });
              }
            }}
            format={dateFormat}
            className={input}
            TextFieldComponent={MarginTextField}
            animateYearScrolling
          />
          <DatePicker
            autoOk
            label={text.epic_to_date}
            inputVariant="outlined"
            value={epic.toDate}
            onChange={(toDate) => setState({ ...epic, toDate })}
            format={dateFormat}
            className={input}
            minDate={geMaxDate(
              addDays(epic.fromDate, minDateDistanceDays),
              addDays(new Date(), 1)
            )}
            TextFieldComponent={MarginTextField}
            animateYearScrolling
          />
          <div className={submitWrapper}>
            <SubmitButton
              variant="contained"
              color="primary"
              onClick={() =>
                sendPutEpic(
                  epic,
                  setMessage,
                  textLang,
                  setOpen,
                  projectId,
                  setLoading,
                  allEpics,
                  setEpics
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
    </MuiPickersUtilsProvider>
  );
};

export default PutEpic;
