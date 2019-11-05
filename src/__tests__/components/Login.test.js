import React from "react";
import TextField from "@material-ui/core/TextField";
import { shallow, mount, render } from "../../enzyme";
import { Login } from "../../components/Login";

describe("Login test render", () => {
  let wrapper;
  beforeEach(() => {
    const login = jest.fn();
    wrapper = shallow(
      <Login isAuth={false} login={login} loading={false} error="" />
    );
  });
  it("should render the form without error", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("should render two input fields for login form", () => {
    expect(wrapper.find(TextField)).toHaveLength(2);
  });
});
