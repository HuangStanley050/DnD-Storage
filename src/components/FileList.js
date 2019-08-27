import React from "react";

const FileList = props => {
  return (
    <ul>
      {props.files.map(file => (
        <li onClick={() => props.deleteFile(file.path)} key={file.path}>
          {file.name}
        </li>
      ))}
    </ul>
  );
};

export default FileList;
