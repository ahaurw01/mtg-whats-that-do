import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';
import CardModal from './CardModal';
import { getImageSources, isDoubleFaced } from '../utils/card-data';
import CardImage from './CardImage';
import cx from 'classnames';
import Presser from '../utils/presser';
import styles from './CardResult.css';
import mixpanel from '../utils/mixpanel';

export default class CardResult extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onRequestRemove: PropTypes.func.isRequired,
    onRequestPin: PropTypes.func.isRequired,
    isPinned: PropTypes.bool.isRequired,
    isFocused: PropTypes.bool,
  };

  static defaultProps = {
    isFocused: false,
  };

  state = {
    card: null,
    allPrintings: [],
    rulings: [],
    faceIndex: 0,
    isCardModalOpen: false,
  };

  selectCard = id => {
    // get the card
    const { allPrintings } = this.state;
    const card = allPrintings.find(card => card.id === id);
    this.setState({ card });
    this.closeCardModal();
  };

  componentDidMount() {
    const { name } = this.props;
    fetch(
      `https://api.scryfall.com/cards/search?q=${encodeURIComponent(
        `!"${name}"`
      )}+include%3Aextras&unique=prints`
    )
      .then(result => result.json())
      .then(result => {
        const cards = result.data;
        const card = cards[0];
        this.setState({ card });
        if (cards.length > 1) {
          this.setState({ allPrintings: cards });
        }
        return fetch(card.rulings_uri);
      })
      .then(result => result.json())
      .then(result =>
        this.setState({
          rulings: result.data,
        })
      );

    this.presser = new Presser();
    this.presser.on('remove', () => {
      if (this.props.isFocused) this.props.onRequestRemove();
    });
    this.presser.on('pin', () => {
      if (this.props.isFocused) this.props.onRequestPin();
    });
    this.presser.on('oracle', () => {
      if (this.props.isFocused && this.state.card) {
        this.openCardModal();
      }
    });
    this.presser.on('flip', () => {
      if (this.props.isFocused && isDoubleFaced(this.state.card)) {
        this.flip();
      }
    });
  }

  componentWillUnmount() {
    this.presser.off();
  }

  flip = () => {
    this.setState(({ faceIndex }) => ({
      faceIndex: (faceIndex + 1) % 2,
    }));
  };

  openCardModal = () => {
    this.setState({ isCardModalOpen: true });
    mixpanel.track('Open Card Modal', { name: this.state.card.name });
  };

  closeCardModal = () => {
    this.setState({ isCardModalOpen: false });
  };

  render() {
    const {
      card,
      allPrintings,
      rulings,
      faceIndex,
      isCardModalOpen,
    } = this.state;
    const { onRequestRemove, onRequestPin, isPinned, isFocused } = this.props;
    const imageSources = getImageSources(card);
    return (
      <Segment className={cx({ [styles.cardIsFocused]: isFocused })}>
        <CardImage sources={imageSources} indexShowing={faceIndex} />
        <div className={styles.actions}>
          <Button.Group>
            {card && (
              <Button
                icon
                primary
                title="Card Info"
                onClick={this.openCardModal}
              >
                <Icon name="info" />
              </Button>
            )}
            <Button icon onClick={onRequestRemove}>
              <Icon name="trash" />
            </Button>
            <Button icon toggle active={isPinned} onClick={onRequestPin}>
              <Icon name="pin" />
            </Button>
            {isDoubleFaced(card) && (
              <Button icon onClick={this.flip}>
                <Icon name="refresh" />
              </Button>
            )}
          </Button.Group>
        </div>

        {card && (
          <CardModal
            card={card}
            rulings={rulings}
            allPrintings={allPrintings}
            onSelectPrinting={this.selectCard}
            isOpen={isCardModalOpen}
            onClose={this.closeCardModal}
          />
        )}
      </Segment>
    );
  }
}
