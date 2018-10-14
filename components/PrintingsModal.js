import PropTypes from 'prop-types';
import { Modal, Grid } from 'semantic-ui-react';

const PrintingsModal = ({ allPrintings, isOpen, onClose }) => (
  <Modal closeIcon onClose={onClose} open={isOpen}>
    <Modal.Header>Select printing/art to display</Modal.Header>
    <Modal.Content>
      <Grid>
        <Grid.Column computer="12" mobile="16">
          {allPrintings.map(card => (
            <h3 key={card.id}>
              {card.set} {card.set_name}
            </h3>
          ))}
        </Grid.Column>
      </Grid>
    </Modal.Content>
  </Modal>
);

PrintingsModal.propTypes = {
  allPrintings: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PrintingsModal;
