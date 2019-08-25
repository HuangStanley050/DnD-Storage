import React, { Component } from "react";
import Dropzone from "react-dropzone";

class DragDrop extends Component {
  state = {
    files: []
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
    console.log(this.state.files);
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}

export default DragDrop;
