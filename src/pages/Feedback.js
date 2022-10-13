import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RedirectButton from '../components/RedirectButton';
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
    const { assertions, score } = this.props;

    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">{feedbackMessage}</h1>
        <fieldset>
          <legend><strong>Placar</strong></legend>
          <h4>
            score:
            <div data-testid="feedback-total-score">
              {score}
            </div>
          </h4>
          <h4>
            assertions:
            <div data-testid="feedback-total-question">
              {assertions}
            </div>
          </h4>
        </fieldset>
        <RedirectButton
          dataTestId="btn-play-again"
          nameBtn="Play Again"
          path="/"
        />
        <br />
        <RedirectButton dataTestId="btn-ranking" nameBtn="Ranking" path="/ranking" />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,

};

export default connect(mapStateToProps)(Feedback);
