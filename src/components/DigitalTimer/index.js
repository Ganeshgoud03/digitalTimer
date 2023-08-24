// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {seconds: 0, minutes: 25, isTimerStarted: false}

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  onMinuteDecrement = () => {
    const {minutes} = this.state

    if (minutes > 1) {
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  onMinuteIncrement = () => {
    this.setState(prevState => ({minutes: prevState.minutes + 1}))
  }

  onResetTimer = () => {
    clearInterval(this.timerID)
    this.setState({seconds: 0, minutes: 25, isTimerStarted: false})
  }

  onChangeTimer = () => {
    const {isTimerStarted, minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (isTimerStarted) {
      clearInterval(this.timerID)
    } else {
      this.timerID = setInterval(this.tick, 1000)
    }
    this.setState(prevState => ({isTimerStarted: !prevState.isTimerStarted}))
  }

  tick = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60

    if (isTimerCompleted) {
      clearInterval(this.timerID)
      this.setState({isTimerStarted: false})
    } else {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  render() {
    const {seconds, minutes, isTimerStarted} = this.state
    const totalRemainingSeconds = minutes * 60 - seconds
    const min = Math.floor(totalRemainingSeconds / 60)
    const sec = Math.floor(totalRemainingSeconds % 60)
    const stringMin = min > 9 ? min : `0${min}`
    const stringSec = sec > 9 ? sec : `0${sec}`
    const isButtonDisabled = seconds > 0

    const timerUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altStatus = isTimerStarted ? 'pause icon' : 'play icon'
    return (
      <div className="bg-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="bottom-container">
          <div className="timer-card">
            <div className="timer-container">
              <h1 className="timer">
                {stringMin}:{stringSec}
              </h1>
              <p className="timer-status">
                {isTimerStarted ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="timer-control-card">
            <div className="button-container">
              <div className="play-container">
                <button
                  type="button"
                  className="play-btn"
                  onClick={this.onChangeTimer}
                >
                  <img src={timerUrl} className="play-img" alt={altStatus} />
                  {isTimerStarted ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="reset-container">
                <button
                  type="button"
                  className="reset-btn"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="reset-img"
                  />
                </button>
                <p className="p2">Reset</p>
              </div>
            </div>
            <div className="minute-container">
              <p className="p3">Set Timer limit</p>
              <div className="increment-decrement-card">
                <button
                  type="button"
                  disabled={isButtonDisabled}
                  onClick={this.onMinuteDecrement}
                  className="decrement-btn"
                >
                  -
                </button>
                <p className="p4">{minutes}</p>
                <button
                  type="button"
                  disabled={isButtonDisabled}
                  onClick={this.onMinuteIncrement}
                  className="increment-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
