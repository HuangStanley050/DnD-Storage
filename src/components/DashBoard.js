import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDataStart } from "../store/actions/getDataAction";
import { noNeedUpdateDashBoard } from "../store/actions/uploadActions";
import PieChartComponent from "./chart/pieChart";
import FileList from "./chart/FileList";

class DashBoard extends Component {
  componentDidMount() {
    const { length, loadData, turnOffUpdate, needUpdate } = this.props;

    if (length === 0) {
      loadData();
    }
    if (needUpdate) {
      turnOffUpdate();
      loadData();
    }
  }

  render() {
    const { data } = this.props;
    const pieData = data.map(pie => ({
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
DashBoard.defaultProps = {
  length: 0,
  data: []
};

DashBoard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func.isRequired,
  turnOffUpdate: PropTypes.func.isRequired,
  needUpdate: PropTypes.bool.isRequired,
  length: PropTypes.number
};

const mapStateToProps = state => ({
  data: state.data.data,
  needUpdate: state.data.needUpdate
});
const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(getDataStart()),
  turnOffUpdate: () => dispatch(noNeedUpdateDashBoard())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
