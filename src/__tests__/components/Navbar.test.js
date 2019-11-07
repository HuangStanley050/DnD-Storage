import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { render } from "../../enzyme";
import { Navbar } from "../../components/NavBar";

describe("<Navbar /> Component testing", () => {
  let mount;
  let shallow;
  let navProps = {};
  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render without issue", () => {
    navProps = {
      isAuth: false,
      logout: jest.fn()
    };
    const wrapper = mount(
      <Router>
        <Navbar {...navProps} />
      </Router>
    );

    expect(wrapper.exists()).toBe(true);
  });
});
