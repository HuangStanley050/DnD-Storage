import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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
    return (
      <div style={pieChartStyle}>
        <ResponsiveContainer width={800} height={600}>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie
              dataKey="value"
              data={this.props.pieData}
              cx={400}
              cy={200}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={200}
              fill="#8884d8"
            >
              {this.props.pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   data: state.data.data
// });
export default PieChartComponent;
