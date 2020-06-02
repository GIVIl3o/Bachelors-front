import React, { useState, useContext } from "react";

const PutSprint = ({open, setOpen, title }) => {
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Dialog
            // open={open}
            // TransitionComponent={Transition}
            // onClose={handleClose}
            // maxWidth="sm"
            // fullWidth={true}
          >
            <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
            <DialogContent>
              {/* <MarginTextField
                autoFocus
                fullWidth
                value={state.title}
                onChange={(e) => setState({ ...state, title: e.target.value })}
                color="primary"
                variant="outlined"
                label={text.epic_name}
                style={{ marginTop: "0rem" }}
                required */}
              />
    
              <DatePicker
                // disablePast
                // autoOk
                // label="Basic example"
                // inputVariant="outlined"
                // value={selectedDate}
                // onChange={setSelectedDate}
                // format="dd/MM/yyyy"
                // animateYearScrolling
              />
            </DialogContent>
    
            <DialogActions>
              {/* <IconButton onClick={handleClose}>
                <CloseIcon fontSize="large" color="secondary" />
              </IconButton> */}
              {/* <IconButton
                onClick={() => {
                  console.log(state);
                  sendCreateProject(state, setMessage, textLang, history);
                }}
              >
                <DoneIcon fontSize="large" color="primary" />
              </IconButton> */}
            </DialogActions>
          </Dialog>
        </MuiPickersUtilsProvider>
      );
  };

  export default PutSprint;
