import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/questions.css';
import { addScore, falseResponse, addAssertions } from '../redux/actions';
import Timer from './Timer';
import NextButton from './NextButton';

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

  // componentDidUpdate() {
  //   const { counter } = this.state;
  //   const FIVE = 4;
  //   if (counter > FIVE) {
  //     history.push('/');
  //   }
  // }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  dificultyValue = (level) => {
    const NUMBER_HARD = 3;
    switch (level) {
    case 'hard':
      return NUMBER_HARD;
    case 'medium':
      return 2;
    case 'easy':
      return 1;
    default:
      return 0;
    }
  };

  applyScore = (questions, index, testid, dispatch) => {
    const number = 10;
    const { timer } = this.state;
    const dificulty = questions.map((itens) => itens.difficulty);
    const scoreState = timer * this.dificultyValue(dificulty[index]) + number;

    if (testid === 'correct-answer') {
      dispatch(addScore(scoreState));
      dispatch(addAssertions(1));
    } else { dispatch(falseResponse()); }
  };

  handleClick = (index, event) => {
    const { target } = event;
    const { dataset: { testid } } = target;
    const { questions, dispatch } = this.props;

    this.setState({ clicou: true });

    this.applyScore(questions, index, testid, dispatch);
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

  nextQuestion = () => {
    const { counter } = this.state;
    const { history } = this.props;
    const FOUR = 4;
    if (counter === FOUR) history.push('/feedback');

    this.setState({ counter: counter + 1, clicou: false, timer: 30 });
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
        <Timer counter={ timer } />
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
                  onClick={ (event) => this.handleClick(index, event) }
                >
                  {this.decodeEntity(answer)}
                </button>
              );
            })
          }
        </div>
        {
          clicou && <NextButton
            isDisabled={ timer === 0 }
            onClick={ this.nextQuestion }
          />
        }
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state.timerReducer,
});

export default connect(mapStateToProps)(Questions);
