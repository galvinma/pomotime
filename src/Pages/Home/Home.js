import React from 'react'

// CSS
import './Home.css'

class Home extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {
      seconds: 0,
      minutes: 25,
      duration: 1500,
      mode: 'POMODORO',
      intervalID: "",
    }
      this.clearInterval = this.clearInterval.bind(this)
      this.decrementTimer = this.decrementTimer.bind(this)
      this.pauseTimer = this.pauseTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
      this.resumeTimer = this.resumeTimer.bind(this)
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
  }

  clearInterval()
  {
    clearInterval(this.state.intervalID)
  }

  decrementTimer()
  {
    let timeLeft = this.state.duration-1
    var minutes = Math.floor(timeLeft/60)
    var seconds = timeLeft - (minutes * 60)

    if (seconds < 10)
    {
      seconds = "0" + seconds
    }

    if (minutes < 10)
    {
      minutes = "0" + minutes
    }

    this.setState({
      minutes: minutes,
      seconds: seconds,
      duration: timeLeft
    })
  }

  pauseTimer()
  {

  }

  resetTimer()
  {

  }

  resumeTimer()
  {

  }

  startTimer()
  {
    let timer = setInterval(this.decrementTimer, 1000);
    this.setState({
      intervalID: timer
    })
  }

  stopTimer()
  {

  }

  render() {
    return (
      <div>
        <div className="content-container">
          <div id="time" className="time-container">
            <div className="minutes">{this.state.minutes}</div>
            <div className="spacer">:</div>
            <div className="seconds">{this.state.seconds}</div>
          </div>
          <div className="controls-container">
            <button className="control-button">Pomodoro</button>
            <button className="control-button">Short Break</button>
            <button className="control-button">Long Break</button>
          </div>
          <div className="controls-container">
            <button className="control-button" onClick={this.startTimer}>Start</button>
            <button className="control-button">Stop</button>
            <button className="control-button">Resume</button>
            <button className="control-button">Reset</button>
          </div>
          <div className="options-container">
            <button className="control-button">Duration</button>
            <button className="control-button">Volume</button>
            <button className="control-button">Tone</button>
          </div>
        </div>
      </div>
  )}
}

export default (Home)
