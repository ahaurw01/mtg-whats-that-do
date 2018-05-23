import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';
import RulingsModal from './RulingsModal';
import { getImageUrl, isDoubleFaced } from '../utils/card-data';

export default class CardResult extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onRequestRemove: PropTypes.func.isRequired,
    onRequestPin: PropTypes.func.isRequired,
    isPinned: PropTypes.bool.isRequired,
  };

  state = {
    card: null,
    rulings: [],
    faceIndex: 0,
  };

  componentDidMount() {
    const { name } = this.props;
    fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
    )
      .then(result => result.json())
      .then(card => {
        this.setState({ card }, this.prefetchOppositeFaceImage);
        return fetch(card.rulings_uri);
      })
      .then(result => result.json())
      .then(result =>
        this.setState({
          rulings: result.data,
        })
      );
  }

  prefetchOppositeFaceImage = () => {
    const { card } = this.state;
    if (!isDoubleFaced(card)) return;

    document.createElement('img').src = getImageUrl(card, 1);
  };

  flip = () => {
    this.setState(({ faceIndex }) => ({
      faceIndex: (faceIndex + 1) % 2,
    }));
  };

  render() {
    const { card, rulings, faceIndex } = this.state;
    const { onRequestRemove, onRequestPin, isPinned } = this.props;
    const imageUrl = getImageUrl(card, faceIndex);
    return (
      <Segment raised>
        <img src={imageUrl} />
        <div className="actions">
          <Button.Group>
            {card && <RulingsModal card={card} rulings={rulings} />}
            <Button icon onClick={onRequestRemove}>
              <Icon name="trash outline" />
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

        <style jsx>{`
          img {
            width: 100%;
            border-radius: 4px;
          }
          .actions {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
          }
        `}</style>
      </Segment>
    );
  }
}
