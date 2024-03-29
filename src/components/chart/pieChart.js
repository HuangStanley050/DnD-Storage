import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { equals } from "ramda";
import PropTypes from "prop-types";
import defineColor from "./colorHelper";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  console.log("render text label gets invoked");
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class PieChartComponent extends PureComponent {
  state = {
    animate: true
  };

  getSnapshotBeforeUpdate(prevProps) {
    const { pieData } = this.props;
    const shouldAnimate = !equals(prevProps.pieData, pieData);
    return shouldAnimate;
  }

  componentDidUpdate(prevProps, prevState, shouldAnimate) {
    if (prevState.animate !== shouldAnimate) {
      this.setState({ animate: shouldAnimate });
    }
  }

  render() {
    const pieChartStyle = {
      margin: "1rem auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    const { pieData } = this.props;
    const { animate } = this.state;

    return (
      <div data-test="pie-chart" style={pieChartStyle}>
        <PieChart width={800} height={450} onMouseEnter={this.onPieEnter}>
          <Pie
            data-test="pie-chart"
            isAnimationActive={animate}
            dataKey="value"
            data={pieData}
            cx={400}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
          >
            {pieData.map(entry => {
              return <Cell key={entry.name} fill={defineColor(entry.name)} />;
            })}
          </Pie>
        </PieChart>
      </div>
    );
  }
}
PieChartComponent.propTypes = {
  pieData: PropTypes.arrayOf(PropTypes.object).isRequired
};
renderCustomizedLabel.defaultProps = {
  index: 0
};
renderCustomizedLabel.propTypes = {
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
  midAngle: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  outerRadius: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  index: PropTypes.number
};
export default PieChartComponent;
