import {Badge, Button, TextField} from "@material-ui/core";
import React, {Component} from "react";
import "./static-resources/app.css";
import logo from "./static-resources/iag.png";
import serverUtils from "./utility-helpers/serverUtils";
import Confetti from "react-dom-confetti";
import generalUtils from "./utility-helpers/generalUtils";

class App extends Component {
  state = {
    correctNumbers: "",
    userGuess: "",
    currentPasswordHint: "",
    userAttempts: 0,
    userWon: false,
    textInputError: false
  };

  bumpUserAttempts = () => {
    this.setState({userAttempts: this.state.userAttempts + 1});
  };

  formatNumbers = inputNumbers => {
    return inputNumbers.toLocaleString().replace(/,\s*$/, "");
  };

  getNewPassword = async () => {
    const passwordHint = await serverUtils.getNewPassword();
    this.setState({currentPasswordHint: passwordHint.hint.join("")});
  };

  handleTextValidation = e => {
    const userText = e.target.value;
    this.setState({userGuess: userText});
    if (userText.match(/^[0-9]+$/) === null) {
      this.setState({textInputError: true});
    } else {
      this.setState({textInputError: false});
    }
  };

  resetGame = () => {
    this.setState({
      correctNumbers: "",
      userGuess: "",
      currentPasswordHint: "",
      userAttempts: 0,
      userWon: false,
      textInputError: false
    });
    this.getNewPassword();
  };

  async componentDidMount() {
    this.getNewPassword();
  }

  handleSubmit = async e => {
    e.preventDefault();

    const userAttempt = Array.from(String(this.state.userGuess), Number);
    const response = await serverUtils.verifyPassword({answer: userAttempt});
    const userCorrectNumbers = this.formatNumbers(response.highlight);

    if (response.correct === true) {
      this.setState({
        correctNumbers: "All digits",
        userWon: true
      });
    } else {
      this.setState({
        correctNumbers: userCorrectNumbers,
        userWon: false
      });
      this.bumpUserAttempts();
    }
  };

  handleTextChange = e => {
    this.handleTextValidation(e);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-header-font">
            Welcome to the password decryption game!
          </h1>
        </header>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Password hint: </strong>
            <span>{this.state.currentPasswordHint}</span>
          </p>
          <div className="formDiv">
            <TextField
              id="outlined-basic"
              label="Enter 8 Numbers"
              variant="outlined"
              error={this.state.textInputError}
              value={this.state.userGuess}
              onChange={e => this.handleTextChange(e)}
            />
            <Badge
              color="error"
              badgeContent={this.state.userAttempts}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            ></Badge>
            <Button
              variant="contained"
              id="submitButton"
              disabled={
                this.state.userGuess.length !== 8 || this.state.textInputError
              }
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <p hidden={!this.state.correctNumbers}>
          You've got {this.state.correctNumbers} In the correct positions!
        </p>
        <div hidden={!this.state.userWon}>
          <Button
            variant="contained"
            type="submit"
            onClick={e => this.resetGame()}
          >
            Would you like to play again?
          </Button>
          <div className="confettiAlign">
            <Confetti active={this.state.userWon} config={generalUtils.returnConfettiConfig()} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
