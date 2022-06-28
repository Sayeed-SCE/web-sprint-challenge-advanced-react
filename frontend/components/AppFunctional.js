import React, { useState } from "react";
import axios from "axios";

export default function AppFunctional(props) {
  const [state, setState] = useState({
    coordinates: "(2, 2)",
    totalMoves: 0,
    square: ["", "", "", "", "B", "", "", "", ""],
    message: "",
    email: "",
  });



  const coordinatesFinder = () => {
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
    const newArray = state.square;
    const val = newArray.indexOf("B");
    const cor = address.find((current, index) => {
      if (index === val) {
        return current;
      }
    });
    return cor;
  };

  const postNewEmail = () => {
    axios
      .post("http://localhost:9000/api/result", {
        x: coordinatesFinder()[1],
        y: coordinatesFinder()[4],
        email: state.email,
        steps: state.totalMoves,
      })
      .then((res) => {
        setState({ ...state, email: "", message: res.data.message });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, message: err.response.data.message });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postNewEmail();
    console.log(state.email);
  };

  const resetState = () => {
    return setState({
      ...state,
      coordinates: "(2, 2)",
      totalMoves: 0,
      square: ["", "", "", "", "B", "", "", "", ""],
      message: "",
      email: "",
    });
  };
  const handleEmail = (e) => {
    const { value } = e.target;
    setState({ ...state, email: value });
  };
  const addMoves = () => {
    return setState({
      ...state,

      totalMoves: state.totalMoves + 1,
    });
  };

  const handleChangeDown = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[6] || newArray[6] || newArray[7] || newArray[8]) {
      return setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves,
        message: "You can't go down",
      });
    } else {
      helperFunc(newArray, val, val + 3);
      setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  const handleChangeUp = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[0] || newArray[0] || newArray[1] || newArray[2]) {
      return setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves,
        message: "You can't go up",
      });
    } else {
      helperFunc(newArray, val, val - 3);
      setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };
  const handleChangeRight = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = state.square;
    const val = newArray.indexOf("B");

    if (val === newArray[1] || newArray[5] || newArray[8] || newArray[2]) {
      return setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves,
        message: "You can't go right",
      });
    } else {
      helperFunc(newArray, val, val + 1);
      setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };

  const handleChangeLeft = () => {
    const helperFunc = (arr, from, to) => {
      let ele = arr[from];
      arr.splice(from, 1);
      arr.splice(to, 0, ele);
    };
    const newArray = state.square;
    const val = newArray.indexOf("B");
    // console.log(coordinatesFinder()[1])

    if (val === newArray[0] || newArray[0] || newArray[3] || newArray[6]) {
      return setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves,
        message: "You can't go left",
      });
    } else {
      helperFunc(newArray, val, val - 1);
      setState({
        ...state,
        coordinates: coordinatesFinder(),
        totalMoves: state.totalMoves + 1,
        message: "",
        square: newArray,
      });
    }
  };
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {state.coordinates}</h3>
        <h3 id="steps">
          You moved{" "}
          {state.totalMoves === 1
            ? `${state.totalMoves} time`
            : `${state.totalMoves} times`}
        </h3>
      </div>
      <div id="grid">
        {state.square.map((val, idx) => {
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
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button onClick={handleChangeLeft} id="left">
          LEFT
        </button>
        <button onClick={handleChangeUp} id="up">
          UP
        </button>
        <button onClick={handleChangeRight} id="right">
          RIGHT
        </button>
        <button onClick={handleChangeDown} id="down">
          DOWN
        </button>
        <button onClick={resetState} id="reset">
          reset
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          value={state.email}
          onChange={handleEmail}
          id="email"
          type="email"
          placeholder="type email"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
