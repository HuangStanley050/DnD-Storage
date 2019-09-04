import React, { Component } from "react";
import uuid from "uuid/v4";
import { connect } from "react-redux";
import { upload_start } from "../store/actions/uploadActions";
import Dropzone from "react-dropzone";
import FileList from "./FileList";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";

class DragDrop extends Component {
  state = {
    files: [],
    totalSize: 0,
    error: false
  };
  deleteFile = id => {
    const files = this.state.files;
    let totalSize = 0;
    let newFiles = files.filter(file => file.id !== id);
    newFiles.forEach(file => (totalSize += file.size));
    totalSize = totalSize / 1024 / 1024;
    this.setState(state => {
      return {
        files: [...newFiles],
        totalSize
      };
    });
  };
  handleDrop = (file, rejectedFile) => {
    if (rejectedFile.length !== 0) {
      console.log("this has been rejected", rejectedFile);
      this.setState(state => {
        return {
          ...state,
          error: true
        };
      });
      return;
    }

    const upLoadFile = file[0];
    let id = uuid();
    upLoadFile.id = id;
    this.setState(state => {
      const list = [...state.files, upLoadFile];
      let totalSize = state.totalSize + upLoadFile.size / 1024 / 1024;
      return {
        files: [...list],
        totalSize,
        error: false
      };
    });
  };
  // onDropRejected = e => {
  //   //return this.props.errorNotice('Maximum file upload size is 2MB');
  //
  //   alert("cant upload file larger than 5mb");
  // };
  render() {
    const iconStyle = {
      //position: "absolute",
      width: "100px",
      height: "100px",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
      color: "blue"
    };

    const wrapper = {
      display: "flex",
      minHeight: "100vh",
      //position: "fixed", //======================> this caused the issue with routing, don't know why
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
      // top: "0",
      // left: "0",
      // bottom: "0",
      // right: "0",
      // margin: "0 auto"
    };

    const buttonStyle = {
      border: "1px solid rgba(25, 118, 210, 0.5)"
    };
    const maxSize = 5242880;
    return (
      <div style={wrapper}>
        <div style={{ height: "200px" }}>
          <Dropzone
            minSize={0}
            maxSize={maxSize}
            onDrop={this.handleDrop}
            // onDropRejected={this.onDropRejected}
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
                  style={{ display: "flex", flexDirection: "column" }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  Drag 'n' drop some files here, or click to select files
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
            <h4>Current: {this.state.totalSize.toFixed(2)}MB</h4>
            {this.state.error ? (
              <div>
                <h3 style={{ color: "red" }}>
                  can't upload file larger than 5MB
                </h3>
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
              onClick={() => this.props.uploadFiles(this.state.files)}
              style={buttonStyle}
              variant="outlined"
            >
              Submit
            </Button>
          </div>
          <div>
            <FileList files={this.state.files} deleteFile={this.deleteFile} />
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  uploadFiles: files => dispatch(upload_start(files))
});

export default connect(
  null,
  mapDispatchToProps
)(DragDrop);
