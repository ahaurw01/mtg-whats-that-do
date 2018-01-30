import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';

export default class CardManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNames: [],
    };
  }

  removeCard = index => {
    this.setState(prevState => ({
      cardNames: [
        ...prevState.cardNames.slice(0, index),
        ...prevState.cardNames.slice(index + 1, prevState.cardNames.length),
      ],
    }));
  };

  addCard = name => {
    this.setState(prevState => ({
      cardNames: prevState.cardNames.concat(name),
    }));
  };

  render() {
    const { cardNames } = this.state;
    return (
      <div>
        {cardNames.map((cardName, index) => (
          <CardResult
            name={cardName}
            key={index}
            onRequestRemove={() => this.removeCard(index)}
          />
        ))}
        <CardFinder onCardSelected={this.addCard} />
      </div>
    );
  }
}
