import PropTypes from 'prop-types';
import { Button, Modal, Segment, Grid, Icon, Header } from 'semantic-ui-react';
import { getImageUrl, isDoubleFaced, getOracleData } from '../utils/card-data';

const OracleModal = ({ card, rulings }) => (
  <Modal
    trigger={
      <Button icon primary title="Oracle">
        <Icon name="info" />
      </Button>
    }
  >
    <Modal.Header>
      <Icon name="info" /> Oracle: {card.name}
    </Modal.Header>
    <Modal.Content>
      <Grid>
        <Grid.Column computer="12" mobile="16">
          {getOracleData(card).map((oracle, index) => (
            <Segment key={index}>
              <Header as="h3" dividing>
                {oracle.name} {oracle.mana_cost}
              </Header>
              <p>{oracle.type_line}</p>
              {oracle.oracle_text &&
                oracle.oracle_text
                  .split('\n')
                  .map(line => <p key={line}>{line}</p>)}
              {oracle.power != null &&
                oracle.toughness != null && (
                  <p>
                    {oracle.power}/{oracle.toughness}
                  </p>
                )}
              {oracle.loyalty != null && <p>Loyalty {oracle.loyalty}</p>}
              <p>
                <i>{oracle.flavor_text}</i>
              </p>
            </Segment>
          ))}
        </Grid.Column>
        <Grid.Column only="computer" width="4">
          <img src={getImageUrl(card)} />
          {isDoubleFaced(card) && <img src={getImageUrl(card, 1)} />}
        </Grid.Column>
      </Grid>
    </Modal.Content>
    <style jsx>{`
      img {
        width: 100%;
        border-radius: 4px;
      }
    `}</style>
  </Modal>
);

OracleModal.propTypes = {
  card: PropTypes.object.isRequired,
};

export default OracleModal;
