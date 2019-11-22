import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { render } from "../../enzyme";
import FileList from "../../components/chart/FileList";
import File from "../../components/chart/File";

describe("<FileList /> component testing", () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render with no issue", () => {
    const testProps = [
      { name: "test1", value: 2 },
      { name: "test2", value: 3 }
    ];

    const wrapper = mount(
      <Router>
        <FileList pieData={testProps} number={4} />
      </Router>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it("should render the same number <File/> as the lenght of pieData array", () => {
    const testProps = [
      { name: "test1", value: 2 },
      { name: "test2", value: 3 }
    ];
    const wrapper = mount(
      <Router>
        <FileList pieData={testProps} />
      </Router>
    );
    const fileNode = wrapper.find("[data-test='data-File-component']");
    const jsx = fileNode.at(0).html();
    expect(wrapper.contains(jsx)).to.equal(10);
  });
});
