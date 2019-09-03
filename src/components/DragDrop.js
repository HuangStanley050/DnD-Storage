import React, { Component } from "react";
import { connect } from "react-redux";
import { upload_start } from "../store/actions/uploadActions";
import Dropzone from "react-dropzone";
import FileList from "./FileList";
import BackupIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";

class DragDrop extends Component {
  state = {
    files: [],
    totalSize: 0
  };
  deleteFile = id => {
    const files = this.state.files;
    let totalSize = 0;
    let newFiles = files.filter(file => file.path !== id);
    newFiles.forEach(file => (totalSize += file.size));
    this.setState({ files: newFiles, totalSize });
  };
  handleDrop = file => {
    const upLoadFile = file[0];

    this.setState(state => {
      const list = [...state.files, upLoadFile];
      let totalSize = state.totalSize + upLoadFile.size / 1024 / 1024;
      return {
        files: [...list],
        totalSize
      };
    });
  };
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

    return (
      <div style={wrapper}>
        <div style={{ height: "200px" }}>
          <Dropzone onDrop={this.handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{ display: "flex", flexDirection: "column" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                Drag 'n' drop some files here, or click to select files
                <BackupIcon style={iconStyle} />
              </div>
            )}
          </Dropzone>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <h3>Files upload Limit: 5MB</h3>
            <h4>Current: {this.state.totalSize}</h4>
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
