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

  it("should only render login option when user is not logged in", () => {
    navProps = {
      isAuth: false,
      logout: jest.fn()
    };
    const wrapper = mount(
      <Router>
        <Navbar {...navProps} />
      </Router>
    );
    const loginBtn = wrapper.find("[data-test='login-button']");

    expect(loginBtn.exists()).toBe(true);
  });

  it("should render Upload, Dashboard and Logout option when user is loggedin", () => {
    navProps = {
      isAuth: true,
      logout: jest.fn()
    };
    const wrapper = mount(
      <Router>
        <Navbar {...navProps} />
      </Router>
    );
    const dashboardBtn = wrapper.find("[data-test='dashboard-button']");
    const logoutBtn = wrapper.find("[data-test='logout-button']");
    const uploadBtn = wrapper.find("[data-test='upload-button']");

    expect(dashboardBtn.exists()).toBe(true);
    expect(logoutBtn.exists()).toBe(true);
    expect(uploadBtn.exists()).toBe(true);
  });
});
