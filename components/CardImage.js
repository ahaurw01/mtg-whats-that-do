import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
    const { loading } = this.state;
    const firstLoadedSrc = !loading[0]
      ? sources[0]
      : !loading[1] ? sources[1] : null;

    return (
      <div className="outer">
        <div className={cx('card', { flipped: indexShowing === 1 })}>
          {sources.map(
            (src, index) =>
              loading[index] ? (
                <div
                  className={cx('spin', {
                    front: index === 0,
                    back: index === 1,
                  })}
                  key={`spinner-${index}`}
                >
                  <Icon name="spinner" loading size="massive" />
                </div>
              ) : (
                <img
                  src={src}
                  key={src}
                  className={cx('img', {
                    front: index === 0,
                    back: index === 1,
                  })}
                />
              )
          )}
          {firstLoadedSrc && <img src={firstLoadedSrc} className="placer" />}
        </div>

        <style jsx>{`
          img {
            width: 100%;
            border-radius: 4.75% / 3.5%;
            backface-visibility: hidden;
          }
          .spin {
            padding: 20px;
            text-align: center;
            position: absolute;
            width: 100%;
            backface-visibility: hidden;
          }
          .outer {
            position: relative;
            perspective: 900px;
          }
          .card {
            min-height: 160px;
            transition: transform 500ms;
            transform-style: preserve-3d;
          }
          .card.flipped {
            transform: rotateY(180deg);
          }
          .front,
          .back {
            position: absolute;
          }
          .back {
            transform: rotateY(180deg);
          }
          .placer {
            visibility: hidden;
          }
        `}</style>
      </div>
    );
  }
}
