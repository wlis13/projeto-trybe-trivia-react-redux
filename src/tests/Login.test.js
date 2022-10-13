import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const token = {
  response_code: 0,
  response_message: 'Token Generated Sucessfully!',
  token: '5d454320350830c86ef0bd40461d8c53bddc6436b8ee8c61b528ff80fe6d94e5',
};

describe('Testando a página de Login', () => {
  it('Verifica se a página Login está no path "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se a tela Login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByText(/name:/i);
    const playBtn = screen.getByRole('button', { name: /play/i });

    expect(nameInput).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
  });

  it('Verifica se a API é chamada após o botão play ser clicado', async () => {
    renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    });

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByTestId('btn-play');

    expect(btnPlay).toBeInTheDocument();
    expect(btnPlay).toBeDisabled();

    userEvent.type(inputName, 'Xablau');
    userEvent.type(inputEmail, 'xablau@trybe.com');

    // expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);
    waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
  });

  it('Verifica se clicar no button "play" redireciona para "/game"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('input-gravatar-email');
    const name = screen.getByTestId('input-player-name');
    const btnPlay = screen.getByTestId('btn-play');

    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(name, 'trybe');
    userEvent.click(btnPlay);
    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
  });
});
