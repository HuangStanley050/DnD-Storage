import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { connect } from "react-redux";
import Loader from "./Loader";
import { getDownloadData, deleteFile } from "../store/actions/getDataAction";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    margin: "2rem auto",
    backgroundColor: theme.palette.background.paper
  }
}));

const Data = props => {
  const classes = useStyles();

  const {
    data,
    download,
    deletefile,
    loading,
    location: {
      state: { type: fileType }
    }
  } = props;

  console.log(fileType);
  console.log(props.location.state);

  return (
    <div className={classes.root}>
      <h1 style={{ textAlign: "center" }}>{fileType}</h1>
      <List aria-label="main mailbox folders">
        {props.data.map(file => {
          if (file.type === fileType) {
            return file.files.map(fileDetail => {
              return (
                <ListItem
                  onClick={() => download(fileDetail.id)}
                  button
                  key={fileDetail.id}
                >
                  <ListItemIcon>
                    <FolderIcon style={{ color: "pink" }} />
                  </ListItemIcon>
                  <ListItemText primary={fileDetail.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => deletefile(fileDetail.id)}
                      edge="end"
                      aria-label="delete"
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            });
          }
          return null;
        })}
      </List>
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Loader />
        </div>
      ) : null}
    </div>
  );
};

Data.propTypes = {
  //   data: PropTypes.arrayOf(PropTypes.object).isRequired,
  download: PropTypes.func.isRequired,
  deletefile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
  //   fileType: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  download: fileID => dispatch(getDownloadData(fileID)),
  deletefile: fileID => dispatch(deleteFile(fileID))
});
const mapStateToProps = state => ({
  loading: state.data.loading,
  data: state.data.data
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Data);
