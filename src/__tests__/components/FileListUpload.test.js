import React from "react";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { render } from "../../enzyme";
import FileListUpload from "../../components/FileListUpload";

describe("<FileListUpload /> component testing", () => {
  let mount;

  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render with no issue", () => {
    const fileListUploadProps = {
      files: [{}, {}],
      deleteFile: jest.fn()
    };
    const wrapper = mount(<FileListUpload {...fileListUploadProps} />);
    expect(wrapper.exists()).toBe(true);
  });
  it("should trigger delete when clicking on trash icon", () => {
    const fileListUploadProps = {
      files: [{}, {}],
      deleteFile: jest.fn()
    };
    const wrapper = mount(<FileListUpload {...fileListUploadProps} />);
    wrapper
      .find("[data-test='delete-button']")
      .at(0)
      .simulate("click");

    expect(fileListUploadProps.deleteFile).toHaveBeenCalled();
  });
  it("should render the right number of files user have drag and dropped", () => {
    const fileListUploadProps = {
      files: [
        { name: "file1 ", size: 1000, id: 1 },
        { name: "file2 ", size: 2000, id: 2 }
      ],
      deleteFile: jest.fn()
    };
    const howManyFiles = fileListUploadProps.files.length;
    const wrapper = mount(<FileListUpload {...fileListUploadProps} />);
    const counter = 0;
    const node = wrapper.find("[data-test='list']");
    console.log(node.at(0).html());
  });
});
