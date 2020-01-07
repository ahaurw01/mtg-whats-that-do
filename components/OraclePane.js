import PropTypes from 'prop-types';
import { Tab, Segment, Grid, Header } from 'semantic-ui-react';
import {
  getImageSources,
  isDoubleFaced,
  getOracleData,
} from '../utils/card-data';
import Iconify from './Iconify';
import PowerToughness from './PowerToughness';
import cx from 'classnames';
import CardImage from './CardImage';
import styles from './OraclePane.css';

const OraclePane = ({ card }) => (
  <Tab.Pane attached={false}>
    <Grid>
      <Grid.Column computer="12" mobile="16">
        {getOracleData(card).map((oracle, index) => (
          <Segment key={index}>
            <Header as="h3" className={styles.oracleCardHeader}>
              {oracle.name} <Iconify shadow>{oracle.mana_cost}</Iconify>
            </Header>
            <p>{oracle.type_line}</p>
            {oracle.oracle_text &&
              oracle.oracle_text.split('\n').map(line => (
                <p key={line}>
                  <Iconify>{line}</Iconify>
                </p>
              ))}
            {oracle.power != null && oracle.toughness != null && (
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
  </Tab.Pane>
);

OraclePane.propTypes = {
  card: PropTypes.object.isRequired,
};

export default OraclePane;
