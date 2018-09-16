import { Component } from 'react';
import CardResult from './CardResult';
import CardFinder from './CardFinder';
import { Grid } from 'semantic-ui-react';
import Column from './Column';
import Presser from '../utils/presser';

export const LOCAL_STORAGE_STATE_KEY = 'CardManager#state';

// Prioritize hash-based state. If not there, look for storage-based state.
export function retrieveSavedState() {
  try {
    const hash = (location.hash || '').replace('#', '');
    const names = JSON.parse(decodeURIComponent(hash));
    return {
      cards: names.map(name => ({ name, isPinned: false, isFocused: false })),
    };
  } catch (e) {
    // Ignore error
  }

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
}

export default class CardManager extends Component {
  state = { cards: [] };

  componentDidMount() {
    this.setState(retrieveSavedState(), () => (location.hash = ''));
    this.presser = new Presser();
    this.presser.on('nextCard', this.focusNextCard);
    this.presser.on('previousCard', this.focusPreviousCard);
    this.presser.on('search', this.blurCards);
  }

  componentWillUnmount() {
    this.presser.off();
  }

  saveState = () => {
    const state = {
      cards: this.state.cards.map(card => ({ ...card, isFocused: false })),
    };
    const stateJson = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_STATE_KEY, stateJson);
  };

  removeCard = name => {
    this.setState(prevState => ({
      cards: prevState.cards.filter(card => card.name !== name),
    }));
  };

  addCard = name => {
    // Prevents the same card being added twice
    if (this.state.cards.findIndex(card => card.name === name) === -1) {
      this.setState(prevState => ({
        cards: prevState.cards.slice().concat({
          name,
          isPinned: false,
          isFocused: false,
        }),
      }));
    }
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

  focusNextCard = () => {
    this.setState(prevState => {
      const currentFocusIndex = prevState.cards.findIndex(
        card => card.isFocused
      );
      const newFocusIndex =
        currentFocusIndex === -1 ||
        currentFocusIndex === prevState.cards.length - 1
          ? 0
          : currentFocusIndex + 1;
      return {
        cards: prevState.cards.map((card, index) => ({
          ...card,
          isFocused: index === newFocusIndex,
        })),
      };
    });
  };

  focusPreviousCard = () => {
    this.setState(prevState => {
      const currentFocusIndex = prevState.cards.findIndex(
        card => card.isFocused
      );
      const newFocusIndex =
        currentFocusIndex === -1 || currentFocusIndex === 0
          ? prevState.cards.length - 1
          : currentFocusIndex - 1;
      return {
        cards: prevState.cards.map((card, index) => ({
          ...card,
          isFocused: index === newFocusIndex,
        })),
      };
    });
  };

  blurCards = () => {
    this.setState(prevState => ({
      cards: prevState.cards.map(card => ({ ...card, isFocused: false })),
    }));
  };

  componentDidUpdate() {
    this.saveState();
  }

  render() {
    const { cards } = this.state;
    return (
      <Grid stackable padded reversed="mobile">
        {cards.map(({ name, isPinned, isFocused }) => (
          <Column key={name}>
            <CardResult
              isFocused={isFocused}
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
