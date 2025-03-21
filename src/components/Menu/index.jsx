import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const ITEM_HEIGHT = 48;

export default function MenuComponent({ options, idPost = null, iconMenu }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleChooseOpt = (event, option) => {
    event.stopPropagation();
    setAnchorEl(null);
    option?.action(idPost);
  };

  const handleAction = (event, action) => {
    if (idPost) {
      handleChooseOpt(event, action);
    } else {
      action.action();
      setAnchorEl(null);
    }
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div style={{ position: "absolute", right: "1%" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        //sx={{backgroundColor:"var(--white)"}}
      >
        {iconMenu}
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.name}
            onClick={(e) => handleAction(e, option)}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {option.name}
            {option?.icon}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
