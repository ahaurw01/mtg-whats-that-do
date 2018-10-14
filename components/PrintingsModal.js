import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Grid } from 'semantic-ui-react';

class PrintingsModal extends Component {
  onPrintingSelect = e => {
    const cardID = e.target.id;
    this.props.selectCard(cardID);
  };
  render() {
    const { allPrintings, isOpen, onClose } = this.props;
    return (
      <Modal closeIcon onClose={onClose} open={isOpen}>
        <Modal.Header>Select printing/art to display</Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Column computer="12" mobile="16">
              {allPrintings.map(card => (
                <h4 key={card.id} id={card.id} onClick={this.onPrintingSelect}>
                  {card.set_name} ({card.set})
                </h4>
              ))}
            </Grid.Column>
          </Grid>
        </Modal.Content>
      </Modal>
    );
  }
}

PrintingsModal.propTypes = {
  selectCard: PropTypes.func.isRequired,
  allPrintings: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PrintingsModal;
