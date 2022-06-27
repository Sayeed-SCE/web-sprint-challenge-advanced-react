import React from "react";
import axios from "axios";

export default class AppClass extends React.Component {
  state = {
    message: "",
    email: "",
    coordinates: "(2, 2)",
    totalMoves: 0,
    square: ["", "", "", "", "B", "", "", "", ""],
  };

  postNewEmail = () => {
    axios
      .post("http://localhost:9000/api/result", {
        x: this.coordinatesFinder()[1],
        y: this.coordinatesFinder()[4],
        email: this.state.email,
        steps: this.state.totalMoves,
      })

      .then((res) => {
        this.setState({
          ...this.state,
          message: res.data.message,
          email: "",
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          message: err.response.data.message,
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.postNewEmail();
    this.setState({
      ...this.state,
      email: "",
    });
  };

  coordinatesFinder = () => {
    const address = [
      "(1, 1)",
      "(2, 1)",
      "(3, 1)",
      "(1, 2)",
      "(2, 2)",
      "(3, 2)",
      "(1, 3)",
      "(2, 3)",
      "(3, 3)",
    ];

    const newArray = this.state.square;
    const val = newArray.indexOf("B");
    const currentSquare = address.find((current, index) => {
      if (index === val) {
        return current;
      }
    });
    return currentSquare;
  };

  resetState = () => {
    return this.setState({
      ...this.state,
      coordinates: "(2, 2)",
      totalMoves: 0,
      square: ["", "", "", "", "B", "", "", "", ""],
      message: "",
      email: "",
    });
  };
  handleEmail = (e) => {
    const { value } = e.target;
    this.setState({ ...this.state, email: value });
  };

  handleChangeLeft = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = this.state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[0] || newArray[0] || newArray[3] || newArray[6]) {
      return this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves,
        message: "You can't go left",
      });
    } else {
      helperFunc(newArray, val, val - 1);
      this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  handleChangeRight = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = this.state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[1] || newArray[5] || newArray[8] || newArray[2]) {
      return this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves,
        message: "You can't go right",
      });
    } else {
      helperFunc(newArray, val, val + 1);
      this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  handleChangeUp = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = this.state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[0] || newArray[0] || newArray[1] || newArray[2]) {
      return this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves,
        message: "You can't go up",
      });
    } else {
      helperFunc(newArray, val, val - 3);
      this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  handleChangeDown = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = this.state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[6] || newArray[6] || newArray[7] || newArray[8]) {
      return this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves,
        message: "You can't go down",
      });
    } else {
      helperFunc(newArray, val, val + 3);
      this.setState({
        ...this.state,
        coordinates: this.coordinatesFinder(),
        totalMoves: this.state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  addMoves = () => {
    return this.setState({
      ...this.state,

      totalMoves: this.state.totalMoves + 1,
    });
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.state.coordinates}</h3>
          <h3 id="steps">
            You moved{" "}
            {this.state.totalMoves === 1
              ? `${this.state.totalMoves} time`
              : `${this.state.totalMoves} times`}
          </h3>
        </div>
        <div id="grid">
          {this.state.square.map((val, idx) => {
            if (val === "B") {
              return (
                <div key={idx} className="square active">
                  {val}
                </div>
              );
            } else {
              return <div key={idx} className="square"></div>;
            }
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleChangeLeft} id="left">
            LEFT
          </button>
          <button onClick={this.handleChangeUp} id="up">
            UP
          </button>
          <button onClick={this.handleChangeRight} id="right">
            RIGHT
          </button>
          <button onClick={this.handleChangeDown} id="down">
            DOWN
          </button>
          <button onClick={this.resetState} id="reset">
            reset
          </button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.email}
            onChange={this.handleEmail}
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    );
  }
}

// // Write your tests here
// import React from "react"
// import { render, screen } from "@testing-library/react";
// import AppClass from './AppClass';

// test('sanity', () => {
//   render(<AppClass/>)
//   expect(true).not.toBe(false)
// })
