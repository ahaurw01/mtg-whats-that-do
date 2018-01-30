import { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

export default class CardResult extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onRequestRemove: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      card: null,
    };
  }

  componentDidMount() {
    const { name } = this.props;
    fetch(`https://api.scryfall.com/cards/named?exact=${name}`)
      .then(result => result.json())
      .then(card => this.setState({ card }));
  }

  render() {
    const { card } = this.state;
    const { onRequestRemove } = this.props;
    const imageUrl = card ? card.image_uris.border_crop : 'about:blank';
    const cardUrl = card ? card.scryfall_uri : '#';
    return (
      <Tile>
        <img src={imageUrl} />
        <div className="actions">
          <a className="action lookup" href={cardUrl} target="_blank">
            View page
          </a>
          <button className="action remove" onClick={onRequestRemove}>
            Remove
          </button>
        </div>
        <style jsx>{`
          img {
            width: 100%;
            border-radius: 4px;
          }
          .actions {
            display: flex;
            justify-content: space-around;
            margin: 10px 0 5px;
          }
          .action {
            width: 40%;
            padding: 12px;
            border: 1px solid black;
            border-radius: 4px;
            font-size: 16px;
            text-align: center;
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          .lookup {
            background: #93cadc;
          }
          .remove {
            background: transparent;
          }
        `}</style>
      </Tile>
    );
  }
}
