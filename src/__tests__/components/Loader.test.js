import React from "react";
import { shallow, render, mount } from "../../enzyme";
import Loader from "../../components/Loader";

describe("<Loader /> component should render", () => {
  it("Should render without issue", () => {
    const wrapper = mount(<Loader />);
    expect(wrapper.exists()).toBe(true);
  });
});
