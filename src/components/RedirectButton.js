import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class RedirectButton extends Component {
  render() {
    const { dataTestId, nameBtn, path } = this.props;
    return (
      <>
        <br />
        <Link to={ `${path}` }>
          <button
            className="button"
            type="submit"
            data-testid={ `${dataTestId}` }
          >
            { `${nameBtn}` }
          </button>
        </Link>
      </>
    );
  }
}

RedirectButton.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  nameBtn: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default RedirectButton;
