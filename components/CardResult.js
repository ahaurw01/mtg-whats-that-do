import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';
import RulingsModal from './RulingsModal';
import { getImageUrl } from '../utils/card-data';

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
  };

  componentDidMount() {
    const { name } = this.props;
    fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
    )
      .then(result => result.json())
      .then(card => {
        this.setState({ card });
        return fetch(card.rulings_uri);
      })
      .then(result => result.json())
      .then(result =>
        this.setState({
          rulings: result.data,
        })
      );
  }

  render() {
    const { card, rulings } = this.state;
    const { onRequestRemove, onRequestPin, isPinned } = this.props;
    const imageUrl = getImageUrl(card);
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
