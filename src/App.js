import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';

class App extends Component {
  state = {
    // paragraph: 'abcdefghijklmnopqrstuvwxyz',
    // paragraph: 'hello how are you doing today?',
    paragraph: 'the quick brown fox jumped over the lazy dog',
    userInput: '',
    timesCompleted: 0,
    error: 0
  }

  updateUserInput = (event) => {
    const userInput = event.target.value.split('')
    const p = _.slice(this.state.paragraph.split(''), 0, userInput.length)
    const error = this.state.error
    let input = true
    let reset = false
    

    _.forEach(p, (char, index) => {
      if(char !== userInput[index]){
        input = false
      }
    })
    
    if(input){
      if(userInput.length >= this.state.paragraph.length){
        reset = true
      }
      this.setState(prevState => ({
        userInput: reset ? '' : userInput.join(''),
        timesCompleted: reset ? prevState.timesCompleted + 1 : prevState.timesCompleted,
        error: reset ? 0 : prevState.error
      }))
    } else {
      this.setState(prevState => ({
        error: error + 1 > 3 ? 0 : prevState.error + 1,
        userInput: error + 1 > 3 ? '' : prevState.userInput
      }));
    }
  }

  render() {
    const paragraph = this.state.paragraph.split('')
    const userInput = this.state.userInput.length
    const tutor = paragraph.map((char, index) => {
      return <span key={index} className={userInput > index ? 'active' : null}>{char === ' ' ? `\u00A0` : char}</span>
    })
    return (
      <div className="App">
        <header>
          <div>
            <h1>Typing Tutor</h1>
            <h3>Completed: {this.state.timesCompleted}</h3>
            <h6>Error: {this.state.error}</h6>
          </div>
        </header>

        <div className={'tutor'}>
          {tutor}
        </div>

        <input type='text' onChange={this.updateUserInput} value={this.state.userInput}/>
      </div>
    )
  }
}

export default App
