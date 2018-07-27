import React, { Component } from 'react';
import './App.css';
import getCurrentTime from './timer_util';


export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row py-2">
        <div className="col-6">
          <a href="#delete_timer" className="px-2" onClick={() => this.props.onDeleteTimer(this.props.id)} >
            <i className="fa fa-times" />
          </a>
          {this.props.timer.active ?
            <a href="#pause_timer" className="px-2" onClick={() => this.props.onTimerPause(this.props.id)} >
              <i className="fa fa-pause start-pause-button" />
            </a> :
            <a href="#start_timer" className="px-2" onClick={() => this.props.onTimerStart(this.props.id)} >
              <i className="fa fa-play start-pause-button" />
            </a>}
          <span className="timer-duration">
            <span>{getCurrentTime(this.props.timer)}</span>
          </span>
        </div>
        <div className="col-6 text-right">
          {
            !this.props.timer.active && this.props.timer.totalSeconds > 0 &&
            <span className="px-3">
              <a
                href="#save_timer"
                className="btn btn-link btn-sm"
                onClick={() => this.props.onClear(this.props.id)}
              >
                Clear
              </a>
              <a
                href={`http://mycase.test/dashboard?total_seconds=${this.props.timer.totalSeconds}`}
                target="_blank"
                className="btn btn-primary btn-sm"
              >
                Save
              </a>
            </span>
          }
        </div>
      </div>
    );
  }
}

