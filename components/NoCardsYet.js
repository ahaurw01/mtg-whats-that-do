import { Responsive, Header, Icon, Button } from 'semantic-ui-react';
import styles from './NoCardsYet.css';

const NoCardsYet = () => (
  <div>
    <Responsive maxWidth={767}>
      <Header as="h1">
        Add a card with the <Icon name="search" /> button.
      </Header>
    </Responsive>
    <Responsive minWidth={768}>
      <Header as="h1">
        Add a card with the <Button>Find a card</Button> button 👆.
      </Header>
    </Responsive>
  </div>
);

export default NoCardsYet;
