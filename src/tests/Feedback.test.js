import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const INITIAL_STATE = {
  player: {
    name: 'Leonardo',
    assertions: 4,
    score: 304,
    gravatarEmail: 'c42c0fba1e11a30d11989c66dc77227a',
  },
};

const initialEntries = ['/ranking'];

describe('Testando a página de Feedback', () => {
  it('Verifica se a página de feedback é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Feedback />);

    const btnPlay = screen.getByRole('button', { name: /play again/i });
    const btnRanking = screen.getByRole('button', { name: /ranking/i });

    expect(btnPlay).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });

  it('Verifica funcionamento do botao play again', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  // it('Verifica funcionamento do botão ranking', () => {
  //   const { history } = renderWithRouterAndRedux(<Feedback />,INITIAL_STATE, initialEntries);

  //   const ranking = screen.getByRole('button', { name: /ranking/i });
  //   expect(ranking).toBeInTheDocument();

  //   console.log(history);
  // });

  it('Verificando o placar', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const feedbackMsg = screen.getByTestId('feedback-text');
    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');

    expect(feedbackMsg).toBeInTheDocument();
    expect(score.innerHTML).toBe('304');
    expect(assertions.innerHTML).toBe('4');
  });
});
