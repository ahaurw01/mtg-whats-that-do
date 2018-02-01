import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';
import { Grid } from 'semantic-ui-react';
import Column from './Column';

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
      <Grid stackable container>
        {cardNames.map((cardName, index) => (
          <Column key={index}>
            <CardResult
              name={cardName}
              onRequestRemove={() => this.removeCard(index)}
            />
          </Column>
        ))}
        <Column>
          <CardFinder onCardSelected={this.addCard} />
        </Column>
      </Grid>
    );
  }
}
