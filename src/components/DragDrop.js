import React, { Component } from "react";
import uuid from "uuid/v4";
import { connect } from "react-redux";
import { upload_start } from "../store/actions/uploadActions";
import Dropzone from "react-dropzone";
import FileList from "./FileList";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";

class DragDrop extends Component {
  maxSize = 5242880;
  state = {
    files: [],
    totalSize: 0,
    currentSize: 0,
    errorMsg: null
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
        totalSize,
        currentSize: totalSize,
        errorMsg: ""
      };
    });
  };

  handleDrop = (file, rejectedFile) => {
    if (rejectedFile.length !== 0) {
      //console.log("this has been rejected", rejectedFile);
      this.setState(state => {
        return {
          ...state,
          errorMsg: "You are not allow to upload file larger than 5mb"
        };
      });
      return;
    }

    const upLoadFile = file[0];
    let id = uuid();
    upLoadFile.id = id;
    let totalSize = this.state.totalSize + upLoadFile.size / 1024 / 1024;

    if (totalSize > 5.24288) {
      //console.log("You have exceeded the total allowed upload size");
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
    const iconStyle = {
      width: "100px",
      height: "100px",
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
      color: this.state.errorMsg ? "#cf5148" : "blue"
    };

    const wrapper = {
      display: "flex",
      minHeight: "100vh",
      //position: "fixed", //======================> this caused the issue with routing, don't know why
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    };

    const buttonStyle = {
      border: "1px solid rgba(25, 118, 210, 0.5)"
    };

    return (
      <div style={wrapper}>
        <div style={{ height: "200px", width: "400px" }}>
          <Dropzone
            //disabled={this.state.disabled}
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
            <h4>Current: {this.state.currentSize.toFixed(2)}MB</h4>
            {this.state.errorMsg ? (
              <div>
                <h3 style={{ color: "red" }}>{this.state.errorMsg}</h3>
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
              disabled={this.state.errorMsg}
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
