import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/questions.css';

class Questions extends Component {
  state = {
    counter: 0,
    correct: null,
    // correctAnswer: 0,
    // incorrectAnswer: 0,
  };

  verifyAnswer = ({ target }) => {
    const { counter } = this.state;
    const { questions } = this.props;
    const { correct_answer: correctAnswer } = questions[counter];

    if (target.innerText === correctAnswer) {
      this.setState({ counter: counter + 1, correct: true });
      return 'correct_answer';
    }
    this.setState({ counter: counter + 1 });
    return 'incorrect_answer';
  };

  // Função Shuffle generica
  // ref. StackOverFlow (https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
  shuffleAnswer = (arrAnswers) => {
    for (let index = arrAnswers.length - 1; index > 0; index -= 1) {
      const replace = Math.floor(Math.random() * (index + 1));
      [arrAnswers[index], arrAnswers[replace]] = [arrAnswers[replace], arrAnswers[index]];
    }
    return arrAnswers;
  };

  // remover entidades dos caracteres html (&quot)
  // ref - encontrado essa função no slack da trybe
  decodeEntity = (param) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = param;
    return textarea.value;
  };

  render() {
    const { counter } = this.state;
    const { questions } = this.props;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer,
    } = questions[counter];

    const answers = [...incorrectAnswer, correctAnswer];
    const randomAnswers = this.shuffleAnswer(answers);

    return (
      <div>
        <h2 data-testid="question-category">
          {this.decodeEntity(category)}
        </h2>
        <p data-testid="question-text">
          {this.decodeEntity(question)}
        </p>
        <div data-testid="answer-options">
          {
            randomAnswers.map((answer, index) => (
              <button
                type="button"
                key={ answer }
                data-testid={ answer === correctAnswer
                  ? 'correct-answer' : `wrong-answer-${index}` }
                className={ answer === correctAnswer
                  ? 'correct_answer' : 'incorrect_answer' }
                onClick={ (e) => this.verifyAnswer(e) }
              >
                {this.decodeEntity(answer)}
              </button>
            ))
          }
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string,
  }).isRequired).isRequired,
};

export default connect()(Questions);
