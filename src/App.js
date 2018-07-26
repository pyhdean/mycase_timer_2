import React, { Component } from 'react';
import './App.css';
import getCurrentTime from './timer_util';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: {
        active: false,
        totalSeconds: 0
      }
    }
    this.onSecondPassed = this.onSecondPassed.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    
  }

  onClear() {
    const timer = {
      ...this.state.timer
    };
    timer.totalSeconds = 0;
    timer.active = false;
    this.setState({
      timer
    });
  }

  onTimerStart() {
    this.updateInterval = setInterval(() => this.onSecondPassed(), 1000);
    const timer = {
      ...this.state.timer
    };
    timer.active = true;
    this.setState({
      timer
    });
  }

  onTimerPause() {
    clearInterval(this.updateInterval);
    this.updateInterval = null;
    const timer = {
      ...this.state.timer
    };
    timer.active = false;
    this.setState({
      timer
    });
  }

  onSecondPassed() {
    const timer = {
      ...this.state.timer
    };
    timer.totalSeconds += 1;
    this.setState({
      timer
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.timer.active ?
          <a href="#pause_timer" className="timer-button timer-pause" onClick={this.onTimerPause} >
            <i className="fa fa-pause start-pause-button" />
          </a> :
          <a href="#start_timer" className="timer-button timer-start" onClick={this.onTimerStart} >
            <i className="fa fa-play start-pause-button" />
          </a>}
        <span className="timer-duration">
          <span>{getCurrentTime(this.state.timer)}</span>
        </span>
        {
          !this.state.timer.active && this.state.timer.totalSeconds > 0 &&
          <span className="timer-secondary-actions">
            <a
              href="#save_timer"
              className="gray_button timer-save-action"
              onClick={this.onClear}
            >
              Clear
            </a>
            <a
              href="https://mycase.test"
              target="_blank"
              className="gray_button timer-save-action"
            >
              Save
            </a>
          </span>
        }
      </div>
    );
  }
}

export default App;
