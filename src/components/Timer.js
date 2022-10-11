import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  // setInterval
  // clearInterval
  componentDidMount() {
    const { startCount } = this.props;
    this.setState({
      count: startCount,
    });
    this.doIntervalChange();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  doIntervalChange = () => {
    const ONE_SECOND = 1000;
    this.myInterval = setInterval(() => {
      this.setState(
        (prev) => ({ count: prev.count > 0 ? prev.count - 1 : 0 }),
      );
    }, ONE_SECOND);
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1>
          Current Count:
          { count }
        </h1>
      </div>
    );
  }
}

Timer.propTypes = {
  startCount: PropTypes.number.isRequired,
};

export default Timer;
