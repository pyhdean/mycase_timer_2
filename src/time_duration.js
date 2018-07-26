import React from 'react';
import getCurrentTime from './timer_util';

export default class TimerDuration extends React.Component {
  componentDidMount() {
    if (this.props.timer.start != null) {
      this.updateInterval = setInterval(() => this.forceUpdate(), 1000);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timer.start === null && this.props.timer.start !== null) {
      this.updateInterval = setInterval(() => this.props.onSecondPassed(), 1000);
    } else if (prevProps.timer.start !== null && this.props.timer.start === null) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  render() {
    return <span>{getCurrentTime(this.state.timer)}</span>;
  }
}

// TimerDuration.propTypes = {
//   timer: PropTypes.shape({
//     start: PropTypes.number,
//     caseId: PropTypes.number,
//     notes: PropTypes.string,
//     totalSeconds: PropTypes.number,
//   }).isRequired,
// };
