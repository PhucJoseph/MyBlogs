import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

export default function MenuComponent({ options, idPost }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation() 
    setAnchorEl(event.currentTarget);
  };
  const handleChooseOpt = (event, option) => {
    event.stopPropagation() 
    setAnchorEl(null);
    option?.action(idPost)
  };

  const handleClose = (event) => {
    event.stopPropagation() 
    setAnchorEl(null);
  }
  

  return (
    <div style={{ position: "absolute", right: "1%" }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{backgroundColor:"var(--white)"}}
      >
        <MoreVertIcon />
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
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.name} onClick={(e) => handleChooseOpt(e, option)} sx={{display: "flex", justifyContent: "space-between"}}>    
            {option.name}
            {option?.icon}

          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
