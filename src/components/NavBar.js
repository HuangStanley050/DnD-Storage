import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../store/actions/authAction";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DescriptionIcon from "@material-ui/icons/Description";
import ExitIcon from "@material-ui/icons/ExitToApp";

//import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const AdapterLink = React.forwardRef((props, ref) => {
  //console.log("props====>", props);
  //console.log("ref====>", ref);
  return <RouterLink innerRef={ref} {...props} />;
});
const Navbar = props => {
  const classes = useStyles();
  const logout_links = (
    <Button
      component={AdapterLink}
      to="/login"
      variant="contained"
      className={classes.button}
    >
      <PersonIcon />
      Login
    </Button>
  );
  const login_links = (
    <>
      <Button
        component={AdapterLink}
        to="/store"
        variant="contained"
        className={classes.button}
      >
        <CloudUploadIcon />
        Upload
      </Button>
      <Button
        variant="contained"
        component={AdapterLink}
        to="/dashboard"
        className={classes.button}
      >
        <DescriptionIcon />
        Dashboard
      </Button>
      <Button
        onClick={() => {
          if (window.confirm("Are you logging out?")) {
            props.logout();
          }
        }}
        variant="contained"
        className={classes.button}
      >
        <ExitIcon />
        Log out
      </Button>
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography
            style={{
              textDecoration: "none",
              color: "white"
            }}
            component={AdapterLink}
            to="/"
            variant="h6"
            className={classes.title}
          >
            File Uploader
          </Typography>

          {props.isAuth ? login_links : logout_links}
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = state => ({ isAuth: state.auth.isAuth });
const mapDispatchToProps = dispatch => ({ logout: () => dispatch(logout()) });
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
