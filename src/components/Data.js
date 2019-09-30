import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    margin: "2rem auto",
    backgroundColor: theme.palette.background.paper
  }
}));

const Data = props => {
  const classes = useStyles();
  //console.log(props.location.state);
  return (
    <div className={classes.root}>
      <h1 style={{ textAlign: "center" }}>{props.location.state.type}</h1>
      <List aria-label="main mailbox folders">
        {props.location.state.data.map(file => {
          return (
            <ListItem button>
              <ListItemIcon s>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={file} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Data;
