import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      // correctAnswer: 0,
      // incorrectAnswer: 0,
      clicou: false,
      timer: 30,
    };
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.myInterval = setInterval(() => {
      this.setState(
        (prev) => ({ timer: prev.timer > 0 ? prev.timer - 1 : 0 }),
      );
    }, ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  handleClick = () => {
    const { counter } = this.state;
    this.setState({ clicou: true });
    const delay = 5000;
    setTimeout(() => this.setState({ counter: counter + 1, clicou: false }), delay);
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
    const { counter, clicou, timer } = this.state;
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
        <div>
          <h1>
            { timer }
          </h1>
        </div>
        <h2 data-testid="question-category">
          {this.decodeEntity(category)}
        </h2>
        <p data-testid="question-text">
          {this.decodeEntity(question)}
        </p>
        <div data-testid="answer-options">
          {
            randomAnswers.map((answer, index) => {
              const verificaResposta = answer === correctAnswer
                ? 'correct_answer' : 'incorrect_answer';
              return (
                <button
                  disabled={ timer === 0 }
                  type="button"
                  key={ answer }
                  data-testid={ answer === correctAnswer
                    ? 'correct-answer' : `wrong-answer-${index}` }
                  className={ clicou ? verificaResposta : '' }
                  onClick={ () => this.handleClick() }
                >
                  {this.decodeEntity(answer)}
                </button>
              );
            })
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

const mapStateToProps = (state) => ({
  ...state.timerReducer,
});

export default connect(mapStateToProps)(Questions);
