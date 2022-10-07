import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.validation();
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
    const { name, email, isDisabled } = this.state;
    return (
      <div>
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
            // onClick={ (e) => {
            //   e.preventDefault();
            //   this.handleClick();
            // } }
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
export default Login;
