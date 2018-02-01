import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

const Tile = ({ children }) => (
  <div className="tile">
    <Segment raised>{children}</Segment>
    <style jsx>{`
      .tile {
        display: block;
        width: 300px;
        min-height: 480px;
        margin: auto;
        position: relative;
      }
      @media (min-width: 768px) {
        .tile {
          width: 350px;
          min-height: 549px;
          margin: 10px;
          float: left;
        }
      }
    `}</style>
  </div>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tile;
