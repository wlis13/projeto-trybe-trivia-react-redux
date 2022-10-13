import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchToken from '../Helpers/fetchToken';
import { saveNamePlayer, convertedGravatarEmail, resetScore } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
    loading: false,
  };

  componentDidMount() {
    this.randleReset();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validation();
  };

  randleReset = () => {
    const { dispatch } = this.props;

    dispatch(resetScore());
  };

  handleClick = async (event) => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    event.preventDefault();

    this.setState({ loading: true });
    const retorno = await fetchToken();
    this.setState({ loading: false });

    localStorage.setItem('token', retorno);
    history.push('/game');

    dispatch(saveNamePlayer(name));
    const convertedEmail = md5(email).toString();
    dispatch(convertedGravatarEmail(convertedEmail));
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

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
