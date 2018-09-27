import PropTypes from 'prop-types';
import { Responsive, Button } from 'semantic-ui-react';
import styles from './FindACardButton.css';

const FindACardButton = ({ onClick }) => (
  <div className={styles.noLineHeight}>
    <Responsive maxWidth={767}>
      <Button
        color="blue"
        icon="search"
        onClick={onClick}
        className={styles.mobile}
      />
    </Responsive>
    <Responsive minWidth={768}>
      <Button color="blue" className={styles.desktop} onClick={onClick}>
        Find a card
      </Button>
    </Responsive>
  </div>
);

FindACardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FindACardButton;
