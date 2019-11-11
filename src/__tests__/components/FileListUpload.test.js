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
});
