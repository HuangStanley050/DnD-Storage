import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3)
  },
  margin: {
    margin: theme.spacing(1)
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2)
  }
}));

const useForm = () => {
  const [form, setValue] = useState({
    email: "",
    password: ""
  });
  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const resetFields = fieldName => {
    setValue({
      ...form,
      email: "",
      password: ""
    });
  };

  return [form, handleChange, resetFields];
};

const Login = props => {
  const classes = useStyles();
  const [form, handleChange, resetFields] = useForm();
  console.log(form);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item style={{ margin: "0 auto" }}>
            <FormControl className={classes.margin}>
              <TextField
                onChange={handleChange}
                className={classes.margin}
                id="input-with-icon-textfield"
                name="email"
                label="Email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                onChange={handleChange}
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Password"
                name="password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SecurityIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default Login;
