import React, { Component } from "react";
import Dropzone from "react-dropzone";
import FileList from "./FileList";
import BackupIcon from "@material-ui/icons/Backup";

class DragDrop extends Component {
  state = {
    files: []
  };
  deleteFile = id => {
    const files = this.state.files;
    let newFiles = files.filter(file => file.path !== id);
    this.setState({ files: newFiles });
  };
  handleDrop = file => {
    const upLoadFile = file[0];
    this.setState(state => {
      const list = [...state.files, upLoadFile];
      return {
        files: [...list]
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
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    };

    return (
      <div style={wrapper}>
        <Dropzone onDrop={this.handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                style={{ display: "flex", flexDirection: "column" }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                Drag 'n' drop some files here, or click to select files
                <BackupIcon style={iconStyle} />
              </div>
              <FileList files={this.state.files} deleteFile={this.deleteFile} />
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default DragDrop;
