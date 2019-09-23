import React, { Component } from "react";
import { get_data_start } from "../store/actions/getDataAction";
import { connect } from "react-redux";
import PieChartComponent from "./chart/pieChart";
import FileList from "./chart/FileList";

class DashBoard extends Component {
  componentDidMount() {
    this.props.loadData();
  }
  render() {
    // const background = {
    //   position: "fixed",
    //   width: "100%",
    //   height: "100%",
    //   left: "0",
    //   zIndex: "100",
    //   top: "0",
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   backgroundColor: "rgba(0,0,0,0.5)"
    // };
    let pieData = this.props.data.map(pie => ({
      name: pie.type,
      value: pie.files.length
    }));
    return (
      <div>
        <h1>This is Dash board</h1>
        <PieChartComponent pieData={pieData} />
        <FileList />
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
