import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';
import { Grid } from 'semantic-ui-react';
import Column from './Column';

export default class CardManager extends Component {
  state = {
    cards: [],
  };

  removeCard = name => {
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.name !== name),
    }));
  };

  addCard = name => {
    this.setState(prevState => ({
      cards: prevState.cards.slice().concat({
        name,
        isPinned: false,
      }),
    }));
  };

  pinCard = name => {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => {
        if (card.name !== name) return card;
        return { ...card, isPinned: !card.isPinned };
      }),
    }));
  };

  clearCards() {
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.isPinned),
    }));
  }

  render() {
    const { cards } = this.state;
    return (
      <Grid stackable padded>
        {cards.map(({ name, isPinned }) => (
          <Column key={name}>
            <CardResult
              name={name}
              isPinned={isPinned}
              onRequestRemove={() => this.removeCard(name)}
              onRequestPin={() => this.pinCard(name)}
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
