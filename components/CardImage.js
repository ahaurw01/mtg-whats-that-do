import { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export default class CardImage extends Component {
  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexShowing: PropTypes.oneOf([0, 1]).isRequired,
  };

  state = {
    loading: [true, true],
  };

  fetchImages = () => {
    if (this.images) return;
    this.images = this.props.sources.map((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.onload = () => {
        this.setState(({ loading: prevLoading }) => ({
          // Replace the loading item at <index> with false.
          loading: [
            ...prevLoading.slice(0, index),
            false,
            ...prevLoading.slice(index + 1, 2),
          ],
        }));
      };
      return img;
    });
  };

  componentDidUpdate() {
    if (this.props.sources.length) {
      this.fetchImages();
    }
  }

  componentDidMount() {
    if (this.props.sources.length) {
      this.fetchImages();
    }
  }

  render() {
    const { sources, indexShowing } = this.props;
    const isSourceLoading = this.state.loading[indexShowing];
    const src = sources[indexShowing];

    return (
      <div>
        {isSourceLoading ? (
          <div className="spin">
            <Icon name="spinner" loading size="massive" className="spin" />
          </div>
        ) : (
          <img src={src} />
        )}
        <style jsx>{`
          img {
            width: 100%;
            border-radius: 4.75% / 3.5%;
          }
          .spin {
            padding: 20px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}
