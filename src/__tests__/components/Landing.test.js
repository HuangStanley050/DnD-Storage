import React from "react";
import { render, mount, shallow } from "../../enzyme";
import Landing from "../../components/Landing";

describe("<Landing /> should render without failure", () => {
  it("should render a landing page", () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.exists()).toBe(true);
  });
  it("should render text of Landing Page", () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.text()).toBe("Landing Page");
  });
});
