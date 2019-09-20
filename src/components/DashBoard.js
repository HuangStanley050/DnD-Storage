import React, { Component } from "react";
import { get_data_start } from "../store/actions/getDataAction";
import { connect } from "react-redux";

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

    return (
      <div>
        <h1>This is Dash board</h1>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(get_data_start())
});
export default connect(
  null,
  mapDispatchToProps
)(DashBoard);
