import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  render() {
    const { counter } = this.props;
    return (
      <div>
        <h1>
          { counter }
        </h1>
      </div>
    );
  }
}

Timer.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default Timer;
