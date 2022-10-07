import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchToken from '../Helpers/fetchToken';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validation();
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    this.setState({ loading: true });
    const retorno = await fetchToken();
    this.setState({ loading: false });
    localStorage.setItem('token', retorno);
    history.push('/games');
  };

  validation() {
    const { email, name } = this.state;
    const ZERO = 0;
    const emailFilled = email.length > ZERO;
    const nameFilled = name.length > ZERO;

    this.setState({
      isDisabled: !emailFilled || !nameFilled,
    });
  }

  render() {
    const { name, email, isDisabled, loading } = this.state;
    return (
      <div>
        { loading && (<p>loading...</p>) }
        <form>
          <label htmlFor="input-player-name">
            Name:
            <input
              onChange={ (e) => this.handleChange(e) }
              name="name"
              value={ name }
              data-testid="input-player-name"
              type="text"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              onChange={ (e) => this.handleChange(e) }
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              type="text"
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ (event) => this.handleClick(event) }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
