import React, { Component } from "react";
import uuid from "uuid/v4";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import BackupIcon from "@material-ui/icons/Backup";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Button from "@material-ui/core/Button";
import { uploadStart, resetUploadStatus } from "../store/actions/uploadActions";
import FileListUpload from "./FileListUpload";
import Loader from "./Loader";

class DragDrop extends Component {
  maxSize = 5242880;

  state = {
    files: [],
    totalSize: 0,
    currentSize: 0,
    errorMsg: null,
    snackbarOpen: false,
    vertical: "bottom",
    horizontal: "right"
  };

  componentDidUpdate(prevProps, prevState) {
    const { uploadSuccess } = this.props;
    if (uploadSuccess !== prevState.snackbarOpen) {
      this.setState({ snackbarOpen: true });
    }
  }

  deleteFile = id => {
    const { files } = this.state;
    let totalSize = 0;
    const newFiles = files.filter(file => file.id !== id);
    newFiles.forEach(file => {
      totalSize += file.size;
    });
    totalSize = totalSize / 1024 / 1024;
    this.setState(state => {
      return {
        files: [...newFiles],
        totalSize,
        currentSize: totalSize,
        errorMsg: ""
      };
    });
  };

  handleClose = () => {
    const { reset } = this.props;
    this.setState({ snackbarOpen: false });
    reset();
  };

  handleSubmit = e => {
    e.preventDefault();
    const { files } = this.state;
    const { uploadFiles } = this.props;
    if (files.length === 0) {
      alert("You can't submit, you have no files uploaded");
      return;
    }
    uploadFiles(files);
    this.setState({ files: [], currentSize: 0, totalSize: 0 });
  };

  handleDrop = (file, rejectedFile) => {
    if (rejectedFile.length !== 0) {
      // console.log("this has been rejected", rejectedFile);
      this.setState(state => {
        return {
          ...state,
          errorMsg: "You are not allow to upload file larger than 5mb"
        };
      });
      return;
    }

    const upLoadFile = file[0];
    const { totalSize: Size } = this.state;
    const id = uuid();
    upLoadFile.id = id;
    const totalSize = Size + upLoadFile.size / 1024 / 1024;

    if (totalSize > 5.24288) {
      // console.log("You have exceeded the total allowed upload size");
      this.setState({
        currentSize: totalSize,
        errorMsg: "You have exceeded the total allowed upload size"
      });
      return;
    }

    this.setState(state => {
      const list = [...state.files, upLoadFile];
      return {
        files: [...list],
        totalSize,
        currentSize: totalSize,
        errorMsg: null
      };
    });
  };

  render() {
    const {
      errorMsg,
      vertical,
      horizontal,
      snackbarOpen,
      currentSize,
      files
    } = this.state;
    const { uploadSuccess, loading } = this.props;
    const iconStyle = {
      width: "100px",
      height: "100px",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
      color: errorMsg ? "#cf5148" : "blue"
    };
    const wrapper = {
      display: "flex",
      minHeight: "100vh",
      // position: "fixed", //======================> this caused the issue with routing, don't know why
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    };
    const buttonStyle = {
      border: "1px solid rgba(25, 118, 210, 0.5)"
    };

    return (
      <div style={wrapper}>
        <Snackbar
          anchorOrigin={{
            vertical,
            horizontal
          }}
          key={`${vertical},${horizontal}`}
          open={snackbarOpen}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            style={
              uploadSuccess
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
            message={uploadSuccess ? "Upload Successful" : "Upload failed"}
          />
        </Snackbar>

        <div style={{ height: "200px", width: "400px" }}>
          <Dropzone
            // disabled={this.state.disabled}
            minSize={0}
            maxSize={this.maxSize}
            onDrop={this.handleDrop}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragReject,
              rejectedFiles
            }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center"
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  Drag and drop some files here, or click to select files
                  <BackupIcon style={iconStyle} />
                </div>
              );
            }}
          </Dropzone>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h3>Files upload Limit: 5MB</h3>
            <h4>Current: {currentSize.toFixed(2)}MB</h4>
            {errorMsg ? (
              <div>
                <h3 style={{ color: "red" }}>{errorMsg}</h3>
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0"
            }}
          >
            <Button
              disabled={!!(errorMsg || loading)}
              onClick={this.handleSubmit}
              style={buttonStyle}
              variant="outlined"
            >
              Submit
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            {loading ? <Loader /> : null}
          </div>
          <div>
            <FileListUpload files={files} deleteFile={this.deleteFile} />
          </div>
        </div>
      </div>
    );
  }
}

DragDrop.propTypes = {
  uploadSuccess: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  uploadFiles: PropTypes.func.isRequired,
  loading: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  uploadFiles: files => dispatch(uploadStart(files)),
  reset: () => dispatch(resetUploadStatus())
});

const mapStateToProps = state => ({
  uploadSuccess: state.data.uploadSuccess,
  loading: state.data.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDrop);
