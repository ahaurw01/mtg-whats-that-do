import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const Column = ({ children }) => (
  <Grid.Column computer="4" tablet="8" mobile="16">
    {children}
  </Grid.Column>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Column;
