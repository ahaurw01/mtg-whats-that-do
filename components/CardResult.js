import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Segment } from 'semantic-ui-react';

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
    fetch(
      `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
    )
      .then(result => result.json())
      .then(card => this.setState({ card }));
  }

  render() {
    const { card } = this.state;
    const { onRequestRemove } = this.props;
    const imageUrl = card ? card.image_uris.border_crop : '';
    const cardUrl = card ? card.scryfall_uri : '#';
    return (
      <Segment raised>
        <img src={imageUrl} />
        <div className="actions">
          <Button as="a" href={cardUrl} target="_blank" primary>
            View page
          </Button>
          <Button onClick={onRequestRemove}>Remove</Button>
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
