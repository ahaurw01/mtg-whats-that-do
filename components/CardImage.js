import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';
import styles from './CardImage.css';

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
      <div className={styles.outer}>
        <div
          className={cx(styles.card, { [styles.flipped]: indexShowing === 1 })}
        >
          {sources.map(
            (src, index) =>
              loading[index] ? (
                <div
                  className={cx(styles.spin, {
                    [styles.front]: index === 0,
                    [styles.back]: index === 1,
                  })}
                  key={`spinner-${index}`}
                >
                  <Icon name="spinner" loading size="massive" />
                </div>
              ) : (
                <img
                  src={src}
                  key={src}
                  className={cx(styles.img, {
                    [styles.front]: index === 0,
                    [styles.back]: index === 1,
                  })}
                />
              )
          )}
          {firstLoadedSrc && (
            <img
              src={firstLoadedSrc}
              className={cx(styles.img, styles.placer)}
            />
          )}
        </div>
      </div>
    );
  }
}
