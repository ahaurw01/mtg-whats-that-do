import { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Dimmer } from 'semantic-ui-react';
import Presser from '../utils/presser';
import InlinedCardBackImage from './InlinedCardBackImage';
import styles from './CardImage.css';

export default class CardImage extends Component {
  static propTypes = {
    sources: PropTypes.arrayOf(PropTypes.string).isRequired,
    highResSources: PropTypes.arrayOf(PropTypes.string).isRequired,
    indexShowing: PropTypes.oneOf([0, 1]).isRequired,
  };

  state = {
    loading: [true, true],
    isImageModalOpen: false,
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

    this.presser = new Presser();
    this.presser.on('escape', () => {
      if (this.state.isImageModalOpen) {
        this.setState({ isImageModalOpen: false });
      }
    });
  }

  componentWillUnmount() {
    this.presser.off();
  }

  render() {
    let { sources, highResSources, indexShowing } = this.props;
    if (!sources.length) {
      // sources will be [] before we get the card data back.
      sources = [null];
    }
    const { loading, isImageModalOpen } = this.state;

    return (
      <div className={styles.outer}>
        <div
          className={cx(styles.card, { [styles.flipped]: indexShowing === 1 })}
        >
          {sources.map((src, index) => {
            const className = cx(styles.img, {
              [styles.front]: index === 0,
              [styles.back]: index === 1,
            });

            return loading[index] ? (
              <InlinedCardBackImage
                className={cx(className, styles.spin)}
                key={`spinner-${index}`}
              />
            ) : (
              <img
                src={src}
                key={src}
                className={className}
                role="button"
                onClick={() => this.setState({ isImageModalOpen: true })}
              />
            );
          })}
          <InlinedCardBackImage className={cx(styles.img, styles.placer)} />
        </div>

        <Dimmer
          page
          onClickOutside={() => this.setState({ isImageModalOpen: false })}
          active={isImageModalOpen}
        >
          <img
            src={highResSources[indexShowing]}
            className={styles.highResImage}
          />
        </Dimmer>
      </div>
    );
  }
}
