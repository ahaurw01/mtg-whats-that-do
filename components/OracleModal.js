import PropTypes from 'prop-types';
import { Button, Modal, Segment, Grid, Icon, Header } from 'semantic-ui-react';
import {
  getImageSources,
  isDoubleFaced,
  getOracleData,
} from '../utils/card-data';
import Iconify from './Iconify';
import PowerToughness from './PowerToughness';
import cx from 'classnames';
import CardImage from './CardImage';

const OracleModal = ({ card }) => (
  <Modal
    closeIcon
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
              <Header as="h3" className="oracle-card-header">
                {oracle.name} <Iconify shadow>{oracle.mana_cost}</Iconify>
              </Header>
              <p>{oracle.type_line}</p>
              {oracle.oracle_text &&
                oracle.oracle_text.split('\n').map(line => (
                  <p key={line}>
                    <Iconify>{line}</Iconify>
                  </p>
                ))}
              {oracle.power != null &&
                oracle.toughness != null && (
                  <p>
                    <PowerToughness
                      power={oracle.power}
                      toughness={oracle.toughness}
                    />
                  </p>
                )}
              {oracle.loyalty != null && (
                <p>
                  <i
                    title={`Loyalty ${oracle.loyalty}`}
                    className={cx(
                      'ms',
                      'ms-loyalty-start',
                      `ms-loyalty-${oracle.loyalty}`,
                      'loyalty'
                    )}
                  />
                </p>
              )}
              {oracle.flavor_text && (
                <p>
                  <i>{oracle.flavor_text}</i>
                </p>
              )}
            </Segment>
          ))}
        </Grid.Column>
        <Grid.Column only="computer" width="4">
          <CardImage sources={getImageSources(card)} indexShowing={0} />
          {isDoubleFaced(card) && (
            <CardImage sources={getImageSources(card)} indexShowing={1} />
          )}
        </Grid.Column>
      </Grid>
    </Modal.Content>
    <style global jsx>{`
      .oracle-card-header {
        display: flex;
        align-items: center;
      }
      .oracle-card-header i {
        margin-left: 2px;
      }
      .oracle-card-header i:first-of-type {
        margin-left: 10px;
      }
      .ms-loyalty-start {
        font-size: 32px !important;
      }
      i[class*='ms-loyalty']:not(.ms-loyalty-start) {
        font-size: 28px !important;
      }
    `}</style>
  </Modal>
);

OracleModal.propTypes = {
  card: PropTypes.object.isRequired,
};

export default OracleModal;
