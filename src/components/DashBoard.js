import React, { Component } from "react";
import { get_data_start } from "../store/actions/getDataAction";
import { noNeedUpdateDashBoard } from "../store/actions/uploadActions";
import { connect } from "react-redux";
import PieChartComponent from "./chart/pieChart";
import FileList from "./chart/FileList";

class DashBoard extends Component {
  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.loadData();
    }
    if (this.props.needUpdate) {
      this.props.turnOffUpdate();
      this.props.loadData();
    }
  }

  render() {
    let pieData;

    pieData = this.props.data.map(pie => ({
      name: pie.type,
      value: pie.files.length,
      files: pie.files
    }));

    return (
      <div>
        <h1>This is Dash board</h1>
        <PieChartComponent pieData={pieData} />
        <FileList pieData={pieData} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data.data,
  needUpdate: state.data.needUpdate
});
const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(get_data_start()),
  turnOffUpdate: () => dispatch(noNeedUpdateDashBoard())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
