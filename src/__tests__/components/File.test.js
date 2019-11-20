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
  it("should display the right data type on the card", () => {
    const testProps = {
      type: "jpg",
      className: "paper",
      number: 3
    };
    const wrapper = mount(
      <Router>
        <File {...testProps} />
      </Router>
    );
    const typeNode = wrapper.find("[data-test='data-type']");
    expect(typeNode.at(0).text()).toBe(testProps.type);
  });
  it("should display the right number of data type on the card", () => {
    const testProps = {
      type: "text",
      className: "paper",
      number: 10
    };
    const wrapper = mount(
      <Router>
        <File {...testProps} />
      </Router>
    );
    const typeNode = wrapper.find("[data-test='data-type-count']");
    expect(typeNode.at(2).text()).toBe(`Number of Files: ${testProps.number}`);
  });
});
