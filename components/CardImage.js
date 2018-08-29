import { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export default class CardImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = {
    loading: true,
    src: '',
  };

  fetchImage = () => {
    if (this.img) return;
    const img = document.createElement('img');
    img.src = this.props.src;
    img.onload = () => this.setState({ loading: false, src: this.props.src });
    this.img = img; // stash for testing purposes
  };

  componentDidUpdate() {
    if (this.props.src) {
      this.fetchImage();
    }
  }

  componentDidMount() {
    if (this.props.src) {
      this.fetchImage();
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className="spin">
            <Icon name="spinner" loading size="massive" className="spin" />
          </div>
        ) : (
          <img src={this.state.src} />
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
