import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Input } from 'semantic-ui-react';
import { LOCAL_STORAGE_STATE_KEY } from './CardManager';

export const constructLink = () => {
  const stringifiedNames = (() => {
    try {
      const cards = JSON.parse(localStorage[LOCAL_STORAGE_STATE_KEY]).cards;
      if (cards.length === 0) throw new Error('no cards to serialize');
      return encodeURIComponent(JSON.stringify(cards.map(card => card.name)));
    } catch (e) {
      return '';
    }
  })();

  let url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1337'
      : 'https://whatsthatdo.net';

  if (stringifiedNames) url += `#${stringifiedNames}`;

  return url;
};

export default class ShareModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    copied: false,
  };

  onClose = () => {
    this.setState({ copied: false });
    this.props.onClose();
  };

  copy = () => {
    this.input.select();
    document.execCommand('copy');
    this.setState({ copied: true });
  };

  render() {
    const { isOpen } = this.props;
    return (
      <Modal
        closeIcon
        centered={false}
        size="tiny"
        onClose={this.onClose}
        open={isOpen}
      >
        <Modal.Header>
          <Icon name="share alternate" /> Share Link
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              Send this link to a friend or bookmark it to view the cards
              currently showing.
            </p>
            <Input
              size="big"
              fluid
              ref={input => (this.input = input)}
              value={constructLink()}
              readOnly
              autoFocus
              onFocus={e => e.target.select()}
              action={{
                icon: this.state.copied ? 'check' : 'copy',
                content: this.state.copied ? 'Copied' : 'Copy',
                color: this.state.copied ? 'green' : null,
                onClick: this.copy,
              }}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
