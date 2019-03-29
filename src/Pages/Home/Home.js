import React from 'react'

// CSS
import './Home.css'

// Audio
import chime from '../.././Audio/tone.mp3'
import metronome from '../.././Audio/metronome.wav'
import beep from '../.././Audio/beep.mp3'

class Home extends React.Component {
  constructor(props)
  {
    super(props)

    this.state = {
      seconds: "00",
      minutes: "25",
      duration: 1500,
      pause: 0,
      mode: 'POMODORO',
      intervalID: "",
      pomoTime: 1500,
      longTime: 600,
      shortTime: 300,
      audioSelection: "CHIME",
      volume: 1.0,
    }
      this.clearInterval = this.clearInterval.bind(this)
      this.decrementTimer = this.decrementTimer.bind(this)
      this.resetTimer = this.resetTimer.bind(this)
      this.resumeTimer = this.resumeTimer.bind(this)
      this.startTimer = this.startTimer.bind(this)
      this.stopTimer = this.stopTimer.bind(this)
      this.changeMode = this.changeMode.bind(this)
      this.timeLeft = this.timeLeft.bind(this)
      this.zeroPad = this.zeroPad.bind(this)
      this.setDuration = this.setDuration.bind(this)
      this.changeAudio = this.changeAudio.bind(this)
      this.changeVolume = this.changeVolume.bind(this)
      this.playTone = this.playTone.bind(this)
  }

  changeAudio(event)
  {
    this.setState({
      audioSelection: event.target.value
    }, () => {
        this.playTone()
    })
  }

  changeMode(event)
  {
    const mode = event.target.value
    const duration = this.setDuration(mode)
    const conversion = this.timeLeft(duration)
    const pad = this.zeroPad(conversion[0], conversion[1])
    const minutes = pad[0]
    const seconds = pad[1]

    this.setState({
      mode: mode,
      duration: duration,
      minutes: minutes,
      seconds: seconds,
    })
  }

  changeVolume(event)
  {
    let val = event.target.value
    let update
    if (val === "0")
    {
      update = 0.0
    }
    else if (val === "30")
    {
      update = 0.3
    }
    else if (val === "50")
    {
      update = 0.5
    }
    else if (val === "70")
    {
      update = 0.7
    }
    else if (val === "100")
    {
      update = 1.0
    }

    this.setState({
      volume: update
    })
  }

  clearInterval()
  {
    clearInterval(this.state.intervalID)
  }

  decrementTimer()
  {
    if (this.state.duration-1 <= 0)
    {
      this.resetTimer()
    }
    else
    {
      const current = this.state.duration-1
      const conversion = this.timeLeft(current)
      const pad = this.zeroPad(conversion[0], conversion[1])
      const minutes = pad[0]
      const seconds = pad[1]

      this.setState({
        minutes: minutes,
        seconds: seconds,
        duration: current
      })
    }
  }

  playTone(event)
  {
    if (this.state.audioSelection === "CHIME") {
      const chime = document.getElementById("chime");
      chime.load()
      chime.volume = this.state.volume
      chime.play();
    }

    if (this.state.audioSelection === "METRONOME")
    {
      const metronome = document.getElementById("metronome");
      metronome.load()
      metronome.volume = this.state.volume
      metronome.play();
    }

    if (this.state.audioSelection === "BEEP") {
      const beep = document.getElementById("beep");
      beep.load()
      beep.volume = this.state.volume
      beep.play();
    }
  }

  resetTimer()
  {
    clearInterval(this.state.intervalID)
    this.playTone()

    const mode = this.state.mode
    const duration = this.setDuration(mode)
    const conversion = this.timeLeft(duration)
    const pad = this.zeroPad(conversion[0], conversion[1])
    const minutes = pad[0]
    const seconds = pad[1]

    this.setState({
      mode: mode,
      duration: duration,
      minutes: minutes,
      seconds: seconds,
    })
  }

  resumeTimer()
  {
    let timer = setInterval(this.decrementTimer, this.state.pause);
    this.setState({
      intervalID: timer
    })
  }

  setDuration(mode)
  {
    if (mode === "POMODORO")
    {
      return this.state.pomoTime
    }
    else if (mode === "SHORT")
    {
      return this.state.shortTime
    }
    else if (mode === "LONG")
    {
      return this.state.longTime
    }
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
    this.clearInterval(this.state.intervalID)

    this.setState({
      pause: this.state.duration
    })
  }

  timeLeft(timeLeft)
  {
    var minutes = Math.floor(timeLeft/60)
    var seconds = timeLeft - (minutes * 60)

    return [minutes, seconds]
  }

  zeroPad(minutes, seconds)
  {
    if (seconds < 10)
    {
      seconds = "0" + seconds
    }

    if (minutes < 10)
    {
      minutes = "0" + minutes
    }

    return [minutes, seconds]
  }

  render() {
    return (
      <div>
        <audio id="chime" src={chime}/>
        <audio id="metronome" src={metronome}/>
        <audio id="beep" src={beep}/>
        <div className="content-container">
          <div id="time" className="time-container">
            <div className="minutes">{this.state.minutes}</div>
            <div className="spacer">:</div>
            <div className="seconds">{this.state.seconds}</div>
          </div>
          <div className="controls-container">
            <button className="control-button" value="POMODORO" onClick={this.changeMode}>Pomodoro</button>
            <button className="control-button" value="SHORT" onClick={this.changeMode}>Short Break</button>
            <button className="control-button" value="LONG" onClick={this.changeMode}>Long Break</button>
          </div>
          <div className="controls-container">
            <button className="control-button" value="START" onClick={this.startTimer}>Start</button>
            <button className="control-button" value="STOP" onClick={this.stopTimer}>Stop</button>
            <button className="control-button" value="RESUME" onClick={this.resumeTimer}>Resume</button>
            <button className="control-button" value="RESET" onClick={this.resetTimer}>Reset</button>
          </div>
          <div className="options-container">
            <div className="volume-container">
              <div className="options-header">Volume</div>
              <button className="control-button" value="0" onClick={this.changeVolume}>0%</button>
              <button className="control-button" value="30" onClick={this.changeVolume}>30%</button>
              <button className="control-button" value="50" onClick={this.changeVolume}>50%</button>
              <button className="control-button" value="70" onClick={this.changeVolume}>70%</button>
              <button className="control-button" value="100" onClick={this.changeVolume}>100%</button>
            </div>
            <div className="tone-container">
              <div className="options-header">Tone</div>
              <button className="control-button" value="CHIME" onClick={this.changeAudio}>Chime</button>
              <button className="control-button" value="METRONOME" onClick={this.changeAudio}>Metronome</button>
              <button className="control-button" value="BEEP" onClick={this.changeAudio}>Beep</button>
            </div>
          </div>
          <div className="message"></div>
        </div>
      </div>
  )}
}

export default (Home)
