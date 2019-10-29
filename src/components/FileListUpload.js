import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
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

const FileListUpload = props => {
  const classes = useStyles();
  const [dense] = React.useState(false);
  const { files } = props;

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        {files.length === 0 ? null : (
          <List dense={dense}>
            {files.map(file => {
              return (
                <ListItem key={file.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={file.name}
                    secondary={`${(file.size / 1024 / 1024).toFixed(2)}MB`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => props.deleteFile(file.id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon />
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

FileListUpload.propTypes = {
  files: PropTypes.arrayOf.isRequired,
  deleteFile: PropTypes.func.isRequired
};
export default FileListUpload;
