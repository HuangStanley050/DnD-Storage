const COLORS = ["#030bfc", "#00C49F", "#FFBB28", "#FF8042", "#17fc03"];

export const define_color = color => {
  if (color.includes("zip")) {
    return COLORS[0];
  } else if (color.includes("text")) {
    return COLORS[1];
  } else if (color.includes("image")) {
    return COLORS[2];
  } else if (color.includes("pdf")) {
    return COLORS[3];
  } else {
    return COLORS[4];
  }
};
