import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';
import { Grid } from 'semantic-ui-react';
import Column from './Column';

export default class CardManager extends Component {
  state = {
    cards: [],
  };

  cardIdSequence = (function*() {
    let id = 0;
    while (true) yield id++;
  })();

  removeCard = id => {
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.id !== id),
    }));
  };

  addCard = name => {
    this.setState(prevState => ({
      cards: prevState.cards
        .slice()
        .concat({
          cardName: name,
          isPinned: false,
          id: this.cardIdSequence.next().value,
        }),
    }));
  };

  pinCard = id => {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => {
        if (card.id !== id) return card;
        return Object.assign({}, card, { isPinned: !card.isPinned });
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
        {cards.map(({ cardName, isPinned, id }) => (
          <Column key={id}>
            <CardResult
              name={cardName}
              isPinned={isPinned}
              onRequestRemove={() => this.removeCard(id)}
              onRequestPin={() => this.pinCard(id)}
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
