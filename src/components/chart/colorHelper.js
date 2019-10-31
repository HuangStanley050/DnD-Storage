const COLORS = ["#030bfc", "#00C49F", "#FFBB28", "#FF8042", "#17fc03"];

const defineColor = color => {
  if (color.includes("zip")) {
    return COLORS[0];
  }
  if (color.includes("text")) {
    return COLORS[1];
  }
  if (color.includes("image")) {
    return COLORS[2];
  }
  if (color.includes("pdf")) {
    return COLORS[3];
  }
  return COLORS[4];
};

export default defineColor;
