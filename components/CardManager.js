import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';
import { Grid } from 'semantic-ui-react';
import Column from './Column';

const LOCAL_STORAGE_STATE_KEY = 'CardManager#state';

export default class CardManager extends Component {
  state = { cards: [] };

  retrieveSavedState = () => {
    try {
      const savedState = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_STATE_KEY)
      );
      if (!savedState || !savedState.cards) {
        throw new Error();
      }
      return savedState;
    } catch (e) {
      return { cards: [] };
    }
  };

  componentDidMount() {
    this.setState(this.retrieveSavedState());
  }

  saveState = () => {
    const stateJson = JSON.stringify(this.state);
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, stateJson);
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

  componentDidUpdate() {
    this.saveState();
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
