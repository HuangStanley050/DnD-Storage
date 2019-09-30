import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

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
            <ListItem button key={file}>
              <ListItemIcon>
                <FolderIcon style={{ color: "pink" }} />
              </ListItemIcon>
              <ListItemText primary={file} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon style={{ color: "red" }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Data;
