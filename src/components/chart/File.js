import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import defineColor from "./colorHelper";

const AdapterLink = React.forwardRef((props, ref) => {
  return <RouterLink innerRef={ref} {...props} />;
});

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    backgroundColor: "dodgerblue"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const File = ({ type, number }) => {
  const classes = useStyles();
  const trimData = str => {
    const index = str.indexOf("/");
    const newStr = str.slice(index + 1, str.length);
    return newStr;
  };
  // trim_data(props.type);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: defineColor(type)
          }}
          variant="h5"
          component="h2"
        >
          {type}
        </Typography>
        <Typography
          style={{ marginTop: "1rem", textAlign: "center", color: "white" }}
          variant="h6"
          component="h4"
        >
          Number of Files: {number}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          to={{
            pathname: `/dashboard/data/${trimData(type)}`,
            state: { type }
          }}
          component={AdapterLink}
          style={{ color: "darkblue" }}
          size="small"
        >
          Download Data
        </Button>
      </CardActions>
    </Card>
  );
};

File.propTypes = {
  type: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
};

export default File;
