import React, { Component } from 'react';
import './App.css';
import getCurrentTime from './timer_util';
import Timer from './timer';

class App extends Component {
  constructor(props) {
    super(props);
    const saved_timers = localStorage.getItem('timers');
    const default_timers = [{
      active: false,
      start: null,
      totalSeconds: 0
    }];
    this.state = {
      timers: saved_timers ? JSON.parse(saved_timers) : default_timers
    }

    this.onSecondPassed = this.onSecondPassed.bind(this);
    this.onTimerStart = this.onTimerStart.bind(this);
    this.onTimerPause = this.onTimerPause.bind(this);
    this.onClear = this.onClear.bind(this);
    this.renderTimers = this.renderTimers.bind(this);
    this.addNewTimer = this.addNewTimer.bind(this);
    this.onDeleteTimer = this.onDeleteTimer.bind(this);
  }

  componentDidMount() {
    const shouldSetInterval = this.state.timers.reduce((accumlator, timer) => {
      return accumlator || timer.active
    }, false)
    if (shouldSetInterval) {
      this.updateInterval = setInterval(() => this.onSecondPassed(), 1000);
    }
  }

  onClear(id) {
    const timer = {
      ...this.state.timers[id]
    };
    timer.totalSeconds = 0;
    timer.start = null;
    timer.active = false;

    const timers = [ ...this.state.timers ];
    timers[id] = timer

    this.setState({
      timers
    }, () => {
      localStorage.setItem('timers', JSON.stringify(this.state.timers));
    });
  }

  onTimerStart(id) {
    if (!this.updateInterval) {
      this.updateInterval = setInterval(() => this.onSecondPassed(), 1000);
    }

    const timer = {
      ...this.state.timers[id]
    };
    if (timer.totalSeconds == 0) {
      timer.totalSeconds = 3600
    }
    timer.start = Date.now();
    timer.active = true;

    const timers = [ ...this.state.timers ];
    timers[id] = timer

    this.setState({
      timers
    }, () => {
      localStorage.setItem('timers', JSON.stringify(this.state.timers));
    });
  }

  onTimerPause(id) {
    clearInterval(this.updateInterval);
    this.updateInterval = null;
    const timer = {
      ...this.state.timers[id]
    };
    timer.totalSeconds += (Date.now() - timer.start)/1000
    timer.start = null;
    timer.active = false;

    const timers = [ ...this.state.timers ];
    timers[id] = timer
    this.setState({
      timers
    }, () => {
      localStorage.setItem('timers', JSON.stringify(this.state.timers));
    });
  }

  onSecondPassed() {
    this.forceUpdate();
  }

  addNewTimer() {
    const newTimer = {
      active: false,
      start: null,
      totalSeconds: 0
    }
    const timers = [ ...this.state.timers ];
    timers.push(newTimer)
    this.setState({
      timers
    }, () => {
      localStorage.setItem('timers', JSON.stringify(this.state.timers));
    });

  }

  onDeleteTimer(id) {
    const timers = [ ...this.state.timers ];
    timers.splice(id, 1);
    this.setState({
      timers
    }, () => {
      localStorage.setItem('timers', JSON.stringify(this.state.timers));
    });
  }

  renderTimers() {
    return this.state.timers.map((timer, index) => {
      return (
        <Timer
          id={index}
          timer={timer}
          onClear={this.onClear}
          onTimerPause={this.onTimerPause}
          onTimerStart={this.onTimerStart}
          onDeleteTimer={this.onDeleteTimer}
        />
      )
    });
  }

  render() {
    return (
      <div className="container">
        {this.renderTimers()}
        <div className="row">
          <a
            href="#"
            className="btn btn-link btn-sm"
            onClick={this.addNewTimer}
          >
            Add a new timer
          </a>
        </div>
      </div>
    );
  }
}

export default App;
