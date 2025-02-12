import React from "react";
import PropTypes from "prop-types";
import { Snackbar, Alert } from "@mui/material";

const intervalMessage = 2000;

const status = ["success", "info", "warning", "error"];

export default function SnackBarComponent({ open, type, message, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={intervalMessage}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={status[type]}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

SnackBarComponent.propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
  message: PropTypes.string.isRequired,
};
