import React, { Component } from 'react';
import RedirectButton from '../components/RedirectButton';

class Ranking extends Component {
  render() {
    return (
      <>
        <div data-testid="ranking-title">Ranking</div>
        <RedirectButton dataTestId="btn-go-home" nameBtn="Home" path="/" />
      </>
    );
  }
}

export default Ranking;
