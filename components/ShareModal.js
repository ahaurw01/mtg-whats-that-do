import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Input } from 'semantic-ui-react';
import { LOCAL_STORAGE_STATE_KEY } from './CardManager';
import styles from './ShareModal.css';

export const constructPayload = () => {
  try {
    const cards = JSON.parse(localStorage[LOCAL_STORAGE_STATE_KEY]).cards;
    if (cards.length === 0) throw new Error('no cards to serialize');
    return JSON.stringify({ cardNames: cards.map(card => card.name) });
  } catch (e) {
    return null;
  }
};

export const getShareUrl = () => {
  const base =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:1337'
      : 'https://whatsthatdo.net';
  const payload = constructPayload();
  if (!payload) return Promise.resolve(base);

  return fetch(
    'https://us-central1-whats-that-do.cloudfunctions.net/share/share',
    {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then(result => result.json())
    .then(({ code }) => `${base}/${code}`);
};

const isIOS = () => navigator.userAgent.match(/ipad|iphone|ipod/i);

export default class ShareModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  state = {
    copied: false,
    isOpen: false,
    isLoading: false,
    url: '',
  };

  onClose = () => {
    this.setState({ copied: false });
    this.props.onClose();
  };

  copy = () => {
    if (!isIOS()) {
      this.input.select();
      document.execCommand('copy');
    } else {
      const input = this.input.inputRef;
      const range = document.createRange();
      input.contentEditable = true;
      range.selectNodeContents(input);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      input.setSelectionRange(0, 999999);
      input.contentEditable = false;
      document.execCommand('copy');
    }

    this.setState({ copied: true });
  };

  componentWillUpdate(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.setState({ isLoading: true, isOpen: true });
      getShareUrl().then(url => {
        this.setState({ url, isLoading: false });

        // Disabling for now: the delay is enough that the browser might not think you
        // are responding to an input gesture.
        // if (navigator.share) {
        //   navigator.share({ title: "What's that do?", url });
        //   this.props.onClose();
        // }
      });
    } else if (!nextProps.isOpen && this.props.isOpen) {
      this.setState({ isOpen: false, isLoading: false });
    }
  }

  render() {
    const { isOpen, isLoading, url } = this.state;
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
          {isLoading ? (
            <div className={styles.center}>
              <Icon name="spinner" loading size="massive" />
            </div>
          ) : (
            <Modal.Description>
              <p>
                Send this link to a friend or bookmark it to view the cards
                currently showing.
              </p>
              <Input
                size="big"
                fluid
                ref={input => (this.input = input)}
                value={url}
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
          )}
        </Modal.Content>
      </Modal>
    );
  }
}
