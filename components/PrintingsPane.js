import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tab, Grid } from 'semantic-ui-react';
import mixpanel from '../utils/mixpanel';

const PrintingsPane = ({ onSelectPrinting, allPrintings }) => {
  useEffect(() => {
    mixpanel.track('View Prices', { name: allPrintings[0].name });
  }, []);

  const onPrintingSelect = e => {
    e.preventDefault();
    const cardID = e.target.id;
    onSelectPrinting(cardID);
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column computer="12" mobile="16">
          {allPrintings.map(card => (
            <h4 key={card.id}>
              <a id={card.id} onClick={onPrintingSelect} href="#">
                {card.set_name} ({card.set})
              </a>
            </h4>
          ))}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

PrintingsPane.propTypes = {
  onSelectPrinting: PropTypes.func.isRequired,
  allPrintings: PropTypes.array.isRequired,
};

export default PrintingsPane;
