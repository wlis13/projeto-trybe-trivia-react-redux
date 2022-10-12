import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    questions: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    const numQuestions = 5;
    const invalidToken = 3;
    const token = localStorage.getItem('token');
    const END_POINT = `https://opentdb.com/api.php?amount=${numQuestions}&token=${token}`;
    const response = await fetch(END_POINT);
    const data = await response.json();
    const { response_code: responseCode, results: questions } = data;

    if (responseCode === invalidToken) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({ questions, isLoading: false });
  };

  render() {
    const { questions, isLoading } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Header />
        {
          isLoading
            ? <p>Loading...</p>
            : <Questions history={ history } questions={ questions } />
        }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
