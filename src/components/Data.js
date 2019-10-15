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
import Loader from "./Loader";
import { get_download_data, delete_file } from "../store/actions/getDataAction";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    margin: "2rem auto",
    backgroundColor: theme.palette.background.paper
  }
}));

const Data = props => {
  const classes = useStyles();
  const fileType = props.location.state.type;
  return (
    <div className={classes.root}>
      <h1 style={{ textAlign: "center" }}>{props.location.state.type}</h1>
      <List aria-label="main mailbox folders">
        {props.data.map(file => {
          if (file.type === fileType) {
            return file.files.map(fileDetail => {
              return (
                <ListItem
                  onClick={() => props.download(fileDetail.id)}
                  button
                  key={fileDetail.id}
                >
                  <ListItemIcon>
                    <FolderIcon style={{ color: "pink" }} />
                  </ListItemIcon>
                  <ListItemText primary={fileDetail.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => props.deleteFile(fileDetail.id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            });
          } else return null;
        })}
      </List>
      {props.loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : null}
    </div>
  );
};
const mapDispatchToProps = dispatch => ({
  download: fileID => dispatch(get_download_data(fileID)),
  deleteFile: fileID => dispatch(delete_file(fileID))
});
const mapStateToProps = state => ({
  loading: state.data.loading,
  data: state.data.data
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);
