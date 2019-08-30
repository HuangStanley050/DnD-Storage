import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Grid from "@material-ui/core/Grid";
//import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  demo: {
    backgroundColor: "#fafafa"
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  }
}));

const FileList = props => {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        {props.files.length === 0 ? null : (
          <List dense={dense}>
            {props.files.map(file => {
              return (
                <ListItem key={file.path}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={file.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => props.deleteFile(file.path)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon></DeleteIcon>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
    </div>
  );
};

export default FileList;
