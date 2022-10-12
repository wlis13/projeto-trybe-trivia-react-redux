import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    feedbackMessage: 'Perdedor',
  };

  componentDidMount() {
    const { assertions } = this.props;
    this.feedbackMessageGenerator(assertions);
  }

  feedbackMessageGenerator = (numberOfAssertions) => {
    const THREE = 3;
    if (numberOfAssertions < THREE) {
      this.setState({ feedbackMessage: 'Could be better...' });
    } else {
      this.setState({ feedbackMessage: 'Well Done!' });
    }
  };

  render() {
    const { feedbackMessage } = this.state;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">{feedbackMessage}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
