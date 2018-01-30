import PropTypes from 'prop-types';

const Tile = ({ children }) => (
  <div className="tile">
    {children}
    <style jsx>{`
      .tile {
        border: 1px solid black;
        border-radius: 4px;
        padding: 10px;
        display: inline-block;
        width: 100%;
        height: 160%;
      }
      @media (min-width: 350px) {
        .tile {
          width: 350px;
          height: 560px;
        }
      }
    `}</style>
  </div>
);

Tile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Tile;
