import PropTypes from 'prop-types';

const Tile = ({ children }) => (
  <div className="tile">
    {children}
    <style jsx>{`
      .tile {
        border: 1px solid black;
        border-radius: 4px;
        padding: 10px;
        display: block;
        width: 300px;
        min-height: 480px;
        margin: auto;
      }
      @media (min-width: 768px) {
        .tile {
          width: 350px;
          height: 560px;
          margin: 0;
        }
      }
    `}</style>
  </div>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tile;
