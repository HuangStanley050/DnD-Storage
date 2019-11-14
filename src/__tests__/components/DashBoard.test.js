import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
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
  it("should render the <PieChartComponent /> if there are data", () => {
    const testProps = {
      loadData: jest.fn(),
      turnOffUpdate: jest.fn(),
      needUpdate: false,
      length: 1,
      data: [
        // should only display 2 file types
        { type: "stuff", files: [{ id: 1, name: "test1" }] },
        { type: "stuff2", files: [{ id: 2, name: "test2" }] }
      ]
    };
    const wrapper = mount(
      <Router>
        <DashBoard {...testProps} />
      </Router>
    );
    const pieNode = wrapper.find("[data-test='pie-chart']").children();
    expect(pieNode.length).toBeGreaterThanOrEqual(testProps.data.length);
  });
  it("should render the <FileList /> in <DashBoard /> if there are data", () => {
    const testProps = {
      loadData: jest.fn(),
      turnOffUpdate: jest.fn(),
      needUpdate: false,
      length: 1,
      data: [
        // should only display 2 file types
        { type: "stuff", files: [{ id: 1, name: "test1" }] },
        { type: "stuff2", files: [{ id: 2, name: "test2" }] }
      ]
    };

    const wrapper = mount(
      <Router>
        <DashBoard {...testProps} />
      </Router>
    );

    const fileListNode = wrapper.find("[data-test='file-list']").children();

    expect(fileListNode.length).toBeGreaterThanOrEqual(testProps.data.length);
  });
});
