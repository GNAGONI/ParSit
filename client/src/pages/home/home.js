import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NotesIcon from "@material-ui/icons/Notes";
import Avatar from "@material-ui/core/avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./styles";
import { authMiddleWare } from "../../utils/auth";
import Account from "../../components/account/account";
import Todo from "../../components/todo/todo";
import Payment from "../../components/payment/payment";
import Message from "../../components/message/message";
import api from "../../api";

class Home extends Component {
  state = {
    component: <Todo />,
  };

  loadAccountPage = (event) => {
    this.setState({ component: <Account /> });
  };

  loadTodoPage = (event) => {
    this.setState({ component: <Todo /> });
  };

  loadPaymentPage = (event) => {
    this.setState({ component: <Payment /> });
  };

  loadMessagePage = (event) => {
    this.setState({ component: <Message /> });
  };

  logoutHandler = (event) => {
    localStorage.removeItem("AuthToken");
    this.props.history.push("/login");
  };

  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: "",
      uiLoading: true,
      imageLoading: false,
    };
  }

  componentWillMount = () => {
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    api.defaults.headers.common = { Authorization: `${authToken}` };
    api
      .get("/user")
      .then((response) => {
        console.log(response.data);
        this.setState({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          country: response.data.country,
          username: response.data.username,
          uiLoading: false,
          profilePicture: response.data.imageUrl,
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 403) {
          this.props.history.push("/login");
        }

        this.setState({ errorMsg: "Error in retrieving the data" });
      });
  };

  render() {
    const { classes } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <div className={classes.root}>
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" noWrap>
                TodoApp
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            <Divider />
            <center>
              <Avatar
                src={this.state.profilePicture}
                className={classes.avatar}
              />
              <p>
                {" "}
                {this.state.firstName} {this.state.lastName}
              </p>
            </center>
            <Divider />
            <List>
              <ListItem button key="Todo" onClick={this.loadTodoPage}>
                <ListItemIcon>
                  {" "}
                  <NotesIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Todo" />
              </ListItem>

              <ListItem button key="Account" onClick={this.loadAccountPage}>
                <ListItemIcon>
                  {" "}
                  <AccountBoxIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItem>

              <ListItem button key="Payment" onClick={this.loadPaymentPage}>
                <ListItemIcon>
                  {" "}
                  <AccountBoxIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Payment" />
              </ListItem>

              <ListItem button key="Message" onClick={this.loadMessagePage}>
                <ListItemIcon>
                  {" "}
                  <AccountBoxIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Message" />
              </ListItem>

              <ListItem button key="Logout" onClick={this.logoutHandler}>
                <ListItemIcon>
                  {" "}
                  <ExitToAppIcon />{" "}
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Drawer>

          {this.state.component}
        </div>
      );
    }
  }
}

export default withStyles(styles)(Home);
