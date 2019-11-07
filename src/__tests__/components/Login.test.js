import React from "react";
import TextField from "@material-ui/core/TextField";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { render } from "../../enzyme";
import { Login } from "../../components/Login";
import Loader from "../../components/Loader";

describe("<Login /> test render", () => {
  let wrapper;
  let mount;
  let shallow;
  let login;
  let loginProps = {};
  beforeEach(() => {
    login = jest.fn();

    mount = createMount();
    shallow = createShallow();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render the form without error", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: false,
      error: ""
    };
    wrapper = shallow(<Login {...loginProps} />);
    expect(wrapper.exists()).toBe(true);
  });
  it("should render two input fields for login form", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: false,
      error: ""
    };
    wrapper = mount(<Login {...loginProps} />);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });
  it("should render one input field for password, one for email", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: false,
      error: ""
    };
    wrapper = mount(<Login {...loginProps} />);
    // wrapper.find(`[data-test="${val}"]`)

    expect(
      wrapper
        .find("input")
        .at(0)
        .props().name
    ).toBe("email");
    expect(
      wrapper
        .find("input")
        .at(1)
        .props().name
    ).toBe("password");
  });
  it("should render a loading spinner if loading props is true", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: true,
      error: ""
    };
    wrapper = mount(<Login {...loginProps} />);
    const loader = wrapper.find(Loader);
    expect(loader.exists()).toBe(true);
  });
  it("should not render a loading spinner if loading props is false", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: false,
      error: ""
    };
    wrapper = mount(<Login {...loginProps} />);
    const loader = wrapper.find(Loader);
    expect(loader.exists()).toBe(false);
  });
  it("should trigger the login method in the props after submit form", () => {
    loginProps = {
      isAuth: false,
      login,
      loading: true,
      error: ""
    };
    wrapper = mount(<Login {...loginProps} />);
    wrapper.find("[data-test='form-submit']").simulate("submit", {
      preventDefault: () => {}
    });

    expect(login).toHaveBeenCalled();
  });
});
