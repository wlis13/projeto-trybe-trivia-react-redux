import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { onClick, isDisabled } = this.props;
    return (
      <button
        data-testid="btn-next"
        disabled={ isDisabled }
        onClick={ onClick }
        type="button"
      >
        Next
      </button>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default NextButton;
