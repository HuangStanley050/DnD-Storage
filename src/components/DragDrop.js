import React, { Component } from "react";
import Dropzone from "react-dropzone";

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
    const dropZoneStyle = {
      position: "fixed",
      width: "200px",
      height: "200px",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      border: "2px solid red"
    };
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section style={dropZoneStyle}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <ul>
              {this.state.files.map(file => (
                <li onClick={() => this.deleteFile(file.path)} key={file.path}>
                  {file.name}
                </li>
              ))}
            </ul>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DragDrop;
