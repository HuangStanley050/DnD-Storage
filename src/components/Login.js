import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";
import { loginStart } from "../store/actions/authAction";
import Loader from "./Loader";

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    // overflow: "hidden",
    // padding: theme.spacing(0, 3)
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh"
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
  const resetFields = () => {
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
  const { isAuth, loading, error } = props;
  const submitHandler = e => {
    e.preventDefault();
    props.login(form);
    resetFields();
  };
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item style={{ margin: "0 auto" }}>
            <form onSubmit={submitHandler}>
              <FormControl
                style={{ width: "500px", justifyContent: "center" }}
                className={classes.margin}
              >
                <TextField
                  onChange={handleChange}
                  className={classes.margin}
                  id="input-with-icon-textfield"
                  name="email"
                  value={form.email}
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
                  value={form.password}
                  type="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SecurityIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  style={{ margin: "0.75rem auto", width: "60%" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onClick={resetFields}
                  variant="contained"
                  color="secondary"
                  style={{ width: "60%", margin: "0.75rem auto" }}
                >
                  Reset
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
        {error ? (
          <h3 style={{ textAlign: "center", color: "red" }}>{error}</h3>
        ) : null}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Loader style={{ margin: "0 auto" }} />
          </div>
        ) : null}
      </Paper>
    </div>
  );
};
Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  error: state.auth.error
});
const mapDispatchToProps = dispatch => {
  return {
    login: userInfo => dispatch(loginStart(userInfo))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
