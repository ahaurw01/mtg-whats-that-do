import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

const Column = ({ children, id }) => (
  <Grid.Column widescreen="2" computer="4" tablet="8" mobile="16" id={id}>
    {children}
  </Grid.Column>
);

Column.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

Column.defaultProps = {
  id: null,
};

export default Column;
