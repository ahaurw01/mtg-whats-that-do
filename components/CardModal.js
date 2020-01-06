import PropTypes from 'prop-types';
import { Modal, Grid, Tab, Icon } from 'semantic-ui-react';
import OraclePane from './OraclePane';

const CardModal = ({ card, isOpen, onClose }) => (
  <Modal closeIcon onClose={onClose} open={isOpen}>
    <Modal.Header>
      <Icon name="info" /> {card.name}
    </Modal.Header>
    <Modal.Content>
      <Grid>
        <Grid.Column mobile="16">
          <Tab
            panes={[
              {
                menuItem: {
                  key: 'oracle',
                  icon: 'info',
                  content: 'Oracle',
                },
                render: () => <OraclePane card={card} />,
              },
            ]}
          />
        </Grid.Column>
      </Grid>
    </Modal.Content>
  </Modal>
);

CardModal.propTypes = {
  card: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CardModal;
