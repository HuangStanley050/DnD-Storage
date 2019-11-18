import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createMount } from "@material-ui/core/test-utils";
import File from "../../components/chart/File";
import { render } from "../../enzyme";

describe("<File/> testing", () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render with no issue", () => {
    const testProps = {
      type: "zip",
      files: [],
      className: "paper",
      number: 2
    };
    const wrapper = mount(
      <Router>
        <File {...testProps} />
      </Router>
    );
    expect(wrapper.exists()).toBe(true);
  });
});
