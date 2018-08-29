import { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

export default class CardImage extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = {
    loading: true,
  };

  imageLoaded = () => this.setState({ loading: false });

  render() {
    return (
      <div>
        <img src={this.props.src} onLoad={this.imageLoaded} />
        {this.state.loading && (
          <div className="spin">
            <Icon name="spinner" loading size="massive" className="spin" />
          </div>
        )}
        <style jsx>{`
          img {
            width: 100%;
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
