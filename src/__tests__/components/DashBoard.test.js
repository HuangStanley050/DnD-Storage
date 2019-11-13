import React from "react";
import { createMount, createShallow } from "@material-ui/core/test-utils";
import { render } from "../../enzyme";
import { DashBoard } from "../../components/DashBoard";
import PieChartComponent from "../../components/chart/pieChart";
import FileList from "../../components/chart/FileList";

describe("<DashBoard /> testing suites", () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  it("should render with no issue", () => {
    const testProps = {
      loadData: jest.fn(),
      turnOffUpdate: jest.fn(),
      needUpdate: false,
      length: 0,
      data: []
    };
    const wrapper = mount(<DashBoard {...testProps} />);
    expect(wrapper.exists()).toBe(true);
  });
  it("should not render Piechart or FileList when there's no data", () => {
    const testProps = {
      loadData: jest.fn(),
      turnOffUpdate: jest.fn(),
      needUpdate: false,
      length: 0,
      data: []
    };
    const wrapper = mount(<DashBoard {...testProps} />);
    const pieNode = wrapper.find("[data-test='pie-chart']");
    const fileListNode = wrapper.find("[data-test='file-list']");
    expect(pieNode.find("g").length).toBe(0); // no pie chart if there's no <g>
    expect(
      fileListNode.find(
        "MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-2 MuiGrid-justify-xs-center"
      ).length
    ).toBe(0);
  });
});
