import PropTypes from 'prop-types';
import { Modal, Grid, Tab, Icon } from 'semantic-ui-react';
import OraclePane from './OraclePane';
import RulingsPane from './RulingsPane';

const CardModal = ({ card, rulings, isOpen, onClose }) => {
  const panes = [];
  panes.push({
    menuItem: {
      key: 'oracle',
      icon: 'info',
      content: 'Oracle',
    },
    render: () => <OraclePane card={card} />,
  });
  if (rulings.length) {
    panes.push({
      menuItem: {
        key: 'rulings',
        icon: 'legal',
        content: 'Rulings',
      },
      render: () => <RulingsPane card={card} rulings={rulings} />,
    });
  }

  return (
    <Modal closeIcon onClose={onClose} open={isOpen}>
      <Modal.Header>
        <Icon name="info" /> {card.name}
      </Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Column mobile="16">
            <Tab panes={panes} />
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  );
};

CardModal.propTypes = {
  card: PropTypes.object.isRequired,
  rulings: PropTypes.arrayOf(
    PropTypes.shape({
      published_at: PropTypes.string,
      source: PropTypes.string,
      comment: PropTypes.string,
    })
  ).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardModal;
