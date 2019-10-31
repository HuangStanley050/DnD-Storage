import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
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
  render() {
    const pieChartStyle = {
      margin: "1rem auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };
    const { pieData } = this.props;
    return (
      <div style={pieChartStyle}>
        <PieChart width={800} height={450} onMouseEnter={this.onPieEnter}>
          <Pie
            dataKey="value"
            data={pieData}
            cx={400}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
          >
            {pieData.map((entry, index) => {
              return <Cell key={entry.name} fill={defineColor(entry.name)} />;
            })}
          </Pie>
        </PieChart>
      </div>
    );
  }
}
PieChartComponent.propTypes = {
  pieData: PropTypes.arrayof(Proptypes.object).isRequired
};
export default PieChartComponent;
