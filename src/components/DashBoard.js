import React, { Component } from "react";
import { get_data_start } from "../store/actions/getDataAction";
import { connect } from "react-redux";
import PieChartComponent from "./chart/pieChart";
import FileList from "./chart/FileList";

class DashBoard extends Component {
  componentDidMount() {
    if (this.props.data.length === 0) {
      this.props.loadData();
      //console.log("data array is empty");
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
  data: state.data.data
});
const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(get_data_start())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
