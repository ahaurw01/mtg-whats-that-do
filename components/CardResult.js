import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment, Icon } from 'semantic-ui-react';
import RulingsModal from './RulingsModal';
import OracleModal from './OracleModal';
import { getImageSources, isDoubleFaced } from '../utils/card-data';
import CardImage from './CardImage';
import cx from 'classnames';
import Presser from '../utils/presser';

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
        this.setState({ card });
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
  }

  componentWillUnmount() {
    this.presser.off();
  }

  flip = () => {
    this.setState(({ faceIndex }) => ({
      faceIndex: (faceIndex + 1) % 2,
    }));
  };

  render() {
    const { card, rulings, faceIndex } = this.state;
    const { onRequestRemove, onRequestPin, isPinned, isFocused } = this.props;
    const imageSources = getImageSources(card);
    return (
      <Segment className={cx({ cardIsFocused: isFocused })}>
        <CardImage sources={imageSources} indexShowing={faceIndex} />
        <div className="actions">
          <Button.Group>
            {card && <OracleModal card={card} />}
            {card && <RulingsModal card={card} rulings={rulings} />}
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
        <style jsx>{`
          .actions {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
          }
        `}</style>
        <style global jsx>{`
          .cardIsFocused {
            box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.5) !important;
          }
        `}</style>
      </Segment>
    );
  }
}
