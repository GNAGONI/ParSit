import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import { fcm, db } from "../../utils/firebase";
import clsx from "clsx";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiver: "",
      messages: [],
      message: "",
    };
  }

  componentWillMount = () => {
    fcm
      .requestPermission()
      .then(() => {
        console.log("have permissions");
        return fcm.getToken();
      })
      .then((token) => {
        console.log(token);
      })
      .catch((e) => {
        console.error(e);
      });

    db.collection("messages")
      .get()
      .then((data) => {
        let messages = [];
        data.forEach((doc) => {
          messages.push({
            id: doc.id,
            text: doc.data().text,
          });
        });

        this.setState({ messages });
      })
      .catch((e) => {
        console.error(e);
      });

    // db.collection("/appointments/MXUk6Y58ixwTSB9ZX13z/messages")
    //   .add({ smth: "test rules 6" })
    //   .then((doc) => console.log(doc))
    //   .catch((e) => console.error(e));
    // db.collection("appointments")
    //   .doc("MXUk6Y58ixwTSB9ZX13z")
    //   .update({ smth: "test rules 6" })
    //   .then((doc) => console.log(doc))
    //   .catch((e) => console.error(e));

    db.collection("families")
      .doc("FGO4wYhocXNUlSOGAcy6")
      .get()
      .then((doc) => {
        console.log(1, doc.data());
      })
      .catch((e) => console.error(1, e));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateFormValues = (event) => {
    event.preventDefault();
    // this.setState({ buttonLoading: true });
    const message = {
      text: this.state.message,
    };
    db.collection("messages")
      .add(message)
      .then((doc) => {
        console.log(doc);
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  renderMessages() {
    return this.state.messages.map((message) => (
      <div key={message.id}>{message.text}</div>
    ));
  }

  render() {
    const { classes, ...rest } = this.props;
    fcm.onMessage((payload) => {
      console.log("Message received. ", payload);
      // ...
    });
    console.log(this.state.messages);
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Card {...rest} className={clsx(classes.root, classes)}>
          {this.renderMessages()}
        </Card>
        <br />
        <Card {...rest} className={clsx(classes.root, classes)}>
          <form autoComplete="off" noValidate>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={8} xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    margin="dense"
                    name="message"
                    variant="outlined"
                    value={this.state.message}
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    className={classes.submitButton}
                    onClick={this.updateFormValues}
                    disabled={!this.state.message}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions />
          </form>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(Message);
