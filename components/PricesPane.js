import { useEffect } from 'react';
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
import mixpanel from '../utils/mixpanel';

const PricesPane = ({ card }) => {
  useEffect(() => {
    mixpanel.track('View Prices', { name: card.name });
  }, []);

  const { prices = {}, purchase_uris = {} } = card;
  const { usd, usd_foil, tix } = prices;
  const { tcgplayer } = purchase_uris;

  const noPricesAvailable = !usd && !usd_foil && !tix;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column mobile="16">
          {noPricesAvailable && (
            <Message
              icon="exclamation triangle"
              content="No pricing data found for this printing."
            />
          )}

          <Statistic.Group horizontal>
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
            {tix && (
              <Statistic>
                <Statistic.Value>{tix}</Statistic.Value>
                <Statistic.Label>Tix</Statistic.Label>
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

          <p>
            <i>Prices are for the selected printing only.</i>
          </p>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

PricesPane.propTypes = {
  card: PropTypes.object.isRequired,
};

export default PricesPane;
