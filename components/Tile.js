import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

const Tile = ({ children }) => (
  <div className="wtd-tile">
    <Segment raised className="wtd-segment">
      {children}
    </Segment>
    <style global jsx>{`
      .wtd-tile {
        display: block;
        margin: auto;
      }

      .wtd-segment {
        width: 300px;
        min-height: 480px;
      }

      @media (min-width: 768px) {
        .wtd-tile {
          margin: 10px;
          float: left;
        }

        .wtd-segment {
          width: 350px;
          min-height: 549px;
        }
      }
    `}</style>
  </div>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tile;
