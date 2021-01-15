import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import styles from "./styles";
import { authMiddleWare } from "../../utils/auth";
import api from "../../api";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      routingNumber: "",
      bankAccountNumber: "",
      confirmAccountNumber: "",
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
          name: response.data.name,
          routingNumber: response.data.routingNumber,
          bankAccountNumber: response.data.bankAccountNumber,
          confirmAccountNumber: response.data.confirmAccountNumber,
          uiLoading: false,
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          this.props.history.push("/login");
        }
        console.log(error);
        this.setState({ errorMsg: "Error in retrieving the data" });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    this.setState({ buttonLoading: true });
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem("AuthToken");
    api.defaults.headers.common = { Authorization: `${authToken}` };
    const formRequest = {
      name: this.state.name,
      routingNumber: this.state.routingNumber,
      bankAccountNumber: this.state.bankAccountNumber,
      confirmAccountNumber: this.state.confirmAccountNumber,
    };
    api
      .put("/user", formRequest)
      .then(() => {
        this.setState({ buttonLoading: false });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          this.props.history.push("/login");
        }
        console.log(error);
        this.setState({
          buttonLoading: false,
        });
      });
  };

  render() {
    const { classes, ...rest } = this.props;
    if (this.state.uiLoading === true) {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.state.uiLoading && (
            <CircularProgress size={150} className={classes.uiProgess} />
          )}
        </main>
      );
    } else {
      return (
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Card {...rest} className={clsx(classes.root, classes)}>
            <form autoComplete="off" noValidate>
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      margin="dense"
                      name="name"
                      variant="outlined"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Routing Number"
                      margin="dense"
                      name="routingNumber"
                      variant="outlined"
                      value={this.state.routingNumber}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Bank Account Number"
                      margin="dense"
                      name="bankAccountNumber"
                      variant="outlined"
                      value={this.state.bankAccountNumber}
                      onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm Account Number"
                      margin="dense"
                      name="confirmAccountNumber"
                      variant="outlined"
                      value={this.state.confirmAccountNumber}
                      onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <CardActions />
            </form>
          </Card>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitButton}
            onClick={this.updateFormValues}
            disabled={
              this.state.buttonLoading ||
              !this.state.name ||
              !this.state.routingNumber ||
              !this.state.bankAccountNumber ||
              !this.state.confirmAccountNumber
            }
          >
            Add ParSit Pay
            {this.state.buttonLoading && (
              <CircularProgress size={30} className={classes.progess} />
            )}
          </Button>
        </main>
      );
    }
  }
}

export default withStyles(styles)(Payment);
