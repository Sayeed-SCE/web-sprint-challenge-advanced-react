import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'
// Suggested initial states
// const initialMessage = ''
// const initialEmail = ''
// const initialSteps = 0
// const initialIndex = 4 // the index the "B" is at

// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// }

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  state ={
    message: " ",
    email: " ",
    totalMoves: 0,
    square:4,
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  
  }
  

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
    message: " ",
    email: " ",
    totalMoves: 0,
    square: 4,  
    });
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({ ...this.state, email: evt.target.value })
  }
  upClickHandler = (evt) => { this.setState({ ...this.state, square: evt.target.value.up}) };
  downClickHandler = (evt) => { this.setState({ ...this.state, square: evt.target.value.down}) };
  rightClickHandler = (evt) => { this.setState({ ...this.state, square: evt.target.value.right}) }
  leftClickHandler = (evt) => { this.setState({ ...this.state, square: evt.target.value.left}) }


  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    axios.post(URL, {email: this.state.email} )
      .then(res => {
        console.log(res)
        this.setState({ ...this.state, email: ''})

      })
      .catch(err => console.log(err))
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinate: (2,2)</h3>
          <h3 id="steps">{`You moved ${this.state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.leftClickHandler}id="left">LEFT</button>
          <button onClick={this.upClickHandler}id="up">UP</button>
          <button onClick={this.rightClickHandler}id="right">RIGHT</button>
          <button onClick={this.downClickHandler}id="down">DOWN</button>
          <button onClick={this.reset}id="reset">reset</button>
        </div>
        <form>
          <input value={this.state.email} 
                  onChange={this.onChange}
                  id="email" type="email" 
                  placeholder="type email">
          </input>

          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
