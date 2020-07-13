import React, { createContext, useState, useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { IconButton, SnackbarContent } from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import { amber, green } from "@material-ui/core/colors";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "App";

export const MessageContext = createContext();

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

const MySnackbarContentWrapper = (props) => {
  const { language } = useContext(UserContext);

  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message[language]}
        </span>
      }
      action={[
        <IconButton key="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
};

export const MessageTypes = {
  success: "success",
  warning: "warning",
  error: "error",
  info: "info",
};

const Messages = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    messageType: MessageTypes.error,
    timeoutId: 0,
  });

  const close = (event, reason) => {
    if (reason !== "clickaway") setState({ ...state, open: false });
  };

  const setMessage = (message, messageType, params = { messageTime: 2000 }) => {
    if (state.open) window.clearTimeout(state.timeoutId);

    setState({
      ...state,
      open: true,
      message,
      messageType,
      timeoutId: window.setTimeout(() => {
        setState({ ...state, message, messageType, open: false });
      }, params.messageTime),
      onClick: params.onClick,
    });
  };

  return (
    <MessageContext.Provider value={setMessage}>
      {children}

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={state.open}
        onClose={close}
        onClick={() => {
          close();
          state.onClick && state.onClick();
        }}
      >
        <MySnackbarContentWrapper
          onClose={(e, v) => {
            e.stopPropagation();
            close(e, v);
          }}
          variant={state.messageType}
          message={state.message}
        />
      </Snackbar>
    </MessageContext.Provider>
  );
};

export default Messages;
