import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Paper from "@material-ui/core/Paper";
import File from "./File";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "0.1rem"
  },
  control: {
    padding: theme.spacing(2)
  }
}));

const FileList = props => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  // const handleChange = event => {
  //   setSpacing(Number(event.target.value));
  // };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {props.pieData.map(data => (
            <Grid key={data.name} item>
              <File
                type={data.name}
                number={data.value}
                className={classes.paper}
                files={data.files}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FileList;
