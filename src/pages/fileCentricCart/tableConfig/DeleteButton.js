import React from "react";
import {
  IconButton,
  Icon,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import deleteIcon from "../../../assets/cart/deleteIcon.svg";

const theme = {
  overrides: {
    MuiIconButton: {
      root: {
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "& span": {
          display: "contents",
        },
       
      },
    },
  },
};

const DeleteButton = (props) => {
  const { data_file_uuid, onDeleteRow, deleteCartFile } = props
  const row = { data_file_uuid };

  const delIcon = (
    <Icon>
      <img alt="delete" src={deleteIcon} />
    </Icon>
  );
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <IconButton
        disableRipple
        disableElevation
        disableFocusRipple
        onClick={(e) => {
          e.stopPropagation();
          deleteCartFile(row, onDeleteRow);
        }}
        aria-label="Remove File"
      >
        {delIcon}
      </IconButton>
    </ThemeProvider>
  );
};

export default DeleteButton;
