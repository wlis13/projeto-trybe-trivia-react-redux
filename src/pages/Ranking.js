import React, { Component } from 'react';
import RedirectButton from '../components/RedirectButton';

class Ranking extends Component {
  state = {
    dateUser: [],
  };

  componentDidMount() {
    const getInfo = JSON.parse(localStorage.getItem('infoUser'));
    this.setState({ dateUser: getInfo });
  }

  render() {
    const { dateUser } = this.state;
    const magicNumber = -1;
    const rankingOrdenado = dateUser
      .sort((a, b) => (a.score > b.score ? magicNumber : 0));
    // (a.score > b.score ? -1 : a.score < b.score ? 1 : 0)
    return (
      <>
        {rankingOrdenado.map((date, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{ date.name }</p>
            <p data-testid={ `player-score-${index}` }>{ date.score }</p>
          </div>
        ))}
        <div data-testid="ranking-title">Ranking</div>
        <RedirectButton dataTestId="btn-go-home" nameBtn="Home" path="/" />
      </>
    );
  }
}

export default Ranking;
