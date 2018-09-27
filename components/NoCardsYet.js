import { Component } from 'react';
import PropTypes from 'prop-types';
import { Responsive, Header, Icon, Container } from 'semantic-ui-react';
import styles from './NoCardsYet.css';

const mobileMessages = [
  <div key="1">
    Hit the <Icon name="search" /> button <Icon name="hand point down" />
  </div>,
];

const desktopMessages = [
  <div key="1">
    Hit the <span className={styles.fauxButton}>Find a card</span> button{' '}
    <Icon name="hand point up" />
  </div>,
  <div key="2">
    Press <kbd>ctrl</kbd> + <kbd>p</kbd> or <kbd>⌘</kbd> + <kbd>p</kbd>
  </div>,
];

class MessageScroller extends Component {
  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.node).isRequired,
  };

  state = {
    messageIndex: 0,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.nextMessage();
    }, 6000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  nextMessage() {
    this.setState(({ messageIndex }) => {
      return {
        messageIndex:
          this.props.messages.length - 1 === messageIndex
            ? 0
            : messageIndex + 1,
      };
    });
  }

  render() {
    const { messageIndex } = this.state;
    const message = this.props.messages[messageIndex];
    return (
      <div className={styles.fadeIn} key={messageIndex}>
        {message}
      </div>
    );
  }
}

const NoCardsYet = () => (
  <div>
    <Responsive maxWidth={767}>
      <Container>
        <Header as="h1" className={styles.mobileText}>
          <MessageScroller messages={mobileMessages} />
        </Header>
      </Container>
    </Responsive>
    <Responsive minWidth={768}>
      <Container>
        <Header as="h1" className={styles.desktopText}>
          <MessageScroller messages={desktopMessages} />
        </Header>
      </Container>
    </Responsive>
  </div>
);

export default NoCardsYet;
