import { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Grid,
  Icon,
  Statistic,
  Segment,
  Message,
  Header,
} from 'semantic-ui-react';
import styles from './PricesPane.css';
import mixpanel from '../utils/mixpanel';

const PricesPane = ({ card, allPrintings }) => {
  useEffect(() => {
    mixpanel.track('View Prices', { name: card.name });
  }, []);

  const { prices = {}, purchase_uris = {} } = card;
  const { usd, usd_foil, tix } = prices;
  const { tcgplayer } = purchase_uris;
  const lowestPriceInfoAmongPrintings = allPrintings.reduce(
    (info, card) => {
      const { prices = {} } = card;
      const { usd, usd_foil } = prices;
      if (usd && +usd < info.lowestPrice)
        info = {
          card,
          lowestPrice: +usd,
          foil: false,
          tcgplayer: card.purchase_uris && card.purchase_uris.tcgplayer,
        };
      if (usd_foil && +usd_foil < info.lowestPrice)
        info = {
          card,
          lowestPrice: +usd_foil,
          foil: true,
          tcgplayer: card.purchase_uris && card.purchase_uris.tcgplayer,
        };

      return info;
    },
    {
      card: null,
      lowestPrice: Infinity,
      foil: false,
    }
  );

  const noPricesAvailable =
    !usd && !usd_foil && !tix && !lowestPriceInfoAmongPrintings.card;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column computer="8" mobile="16">
          {noPricesAvailable && (
            <Message
              icon="exclamation triangle"
              content="No pricing data found for this card."
            />
          )}

          <Header size="medium">
            Pricing for <i>{card.set_name}</i>
          </Header>

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

            {tcgplayer && (
              <Segment>
                <a target="_blank" rel="noopener noreferrer" href={tcgplayer}>
                  <Icon name="external" /> Buy on TCGPlayer
                </a>
              </Segment>
            )}
          </Statistic.Group>
        </Grid.Column>
        <Grid.Column computer="8" mobile="16">
          <Statistic.Group horizontal>
            {lowestPriceInfoAmongPrintings.card && (
              <>
                <Header size="medium">
                  Lowest price is from{' '}
                  <i>{lowestPriceInfoAmongPrintings.card.set_name}</i>
                </Header>
                <Statistic>
                  <Statistic.Value>
                    <span className={styles.dollar}>$</span>
                    {lowestPriceInfoAmongPrintings.lowestPrice.toFixed(2)}
                  </Statistic.Value>
                  <Statistic.Label>
                    {lowestPriceInfoAmongPrintings.foil ? 'foil' : 'non-foil'}
                  </Statistic.Label>
                </Statistic>

                {lowestPriceInfoAmongPrintings.tcgplayer && (
                  <Segment>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={lowestPriceInfoAmongPrintings.tcgplayer}
                    >
                      <Icon name="external" /> Buy on TCGPlayer
                    </a>
                  </Segment>
                )}
              </>
            )}
          </Statistic.Group>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <p>
            <i>Prices are updated daily.</i>
          </p>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

PricesPane.propTypes = {
  card: PropTypes.object.isRequired,
  allPrintings: PropTypes.array.isRequired,
};

export default PricesPane;
