import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

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

const FileList = ({ pieData }) => {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid
          data-test="file-list"
          container
          justify="center"
          spacing={spacing}
        >
          {pieData.map(data => (
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
FileList.propTypes = {
  pieData: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default FileList;
