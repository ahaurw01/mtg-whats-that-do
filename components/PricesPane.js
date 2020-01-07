import PropTypes from 'prop-types';
import {
  Tab,
  Grid,
  Icon,
  Statistic,
  Segment,
  Message,
} from 'semantic-ui-react';
import styles from './PricesPane.css';

const PricesPane = ({ card }) => {
  const { prices = {}, purchase_uris = {} } = card;
  const { usd, usd_foil } = prices;
  const { tcgplayer } = purchase_uris;

  const noPricesAvailable = !usd && !usd_foil;

  return (
    <Tab.Pane attached={false}>
      <Grid>
        <Grid.Column mobile="16">
          {noPricesAvailable && (
            <Message
              icon="exclamation triangle"
              content="No pricing data found for this printing."
            />
          )}
          <Statistic.Group widths={[usd, usd_foil].filter(p => p).length || 1}>
            {usd && (
              <Statistic>
                <Statistic.Value>
                  <span className={styles.dollar}>$</span>
                  {usd}
                </Statistic.Value>
                <Statistic.Label>Non-foil</Statistic.Label>
              </Statistic>
            )}
            {usd_foil && (
              <Statistic>
                <Statistic.Value>
                  <span className={styles.dollar}>$</span>
                  {usd_foil}
                </Statistic.Value>
                <Statistic.Label>Foil</Statistic.Label>
              </Statistic>
            )}
          </Statistic.Group>
          {tcgplayer && (
            <Segment>
              <a target="_blank" rel="noopener noreferrer" href={tcgplayer}>
                <Icon name="external" /> Buy on TCGPlayer
              </a>
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

PricesPane.propTypes = {
  card: PropTypes.object.isRequired,
};

export default PricesPane;
