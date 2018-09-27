import { Responsive, Header, Icon, Container } from 'semantic-ui-react';
import styles from './NoCardsYet.css';

const NoCardsYet = () => (
  <div className={styles.fadeIn}>
    <Responsive maxWidth={767}>
      <Container>
        <Header as="h1" className={styles.mobileText}>
          Hit the <Icon name="search" /> button <Icon name="hand point down" />
        </Header>
      </Container>
    </Responsive>
    <Responsive minWidth={768}>
      <Container>
        <Header as="h1" className={styles.desktopText}>
          Hit the <span className={styles.fauxButton}>Find a card</span> button{' '}
          <Icon name="hand point up" />
        </Header>
      </Container>
    </Responsive>
  </div>
);

export default NoCardsYet;
