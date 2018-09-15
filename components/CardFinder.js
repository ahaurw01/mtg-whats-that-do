import { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, Input, Segment } from 'semantic-ui-react';
import * as presser from '../utils/presser';

export default class CardFinder extends Component {
  static propTypes = {
    onCardSelected: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      value: '',
      lastFetchTime: 0,
    };
  }

  focus = () => {
    this.input.focus();
  };

  blur = () => {
    this.input.blur();
  };

  onSearchChange = (e, { value }) => {
    this.setState({ value });
    if (value.length < 3) {
      this.setState({ results: [] });
      return;
    }

    const lastFetchTime = +Date.now();
    this.setState({ loading: true, lastFetchTime });
    fetch(
      `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(
        value
      )}`
    )
      .then(result => result.json())
      .then(result =>
        this.setState(prevState => {
          if (prevState.lastFetchTime > lastFetchTime) {
            // We've kicked off another fetch since this one. Ignore this one.
            return;
          }
          return {
            results: (result.data || []).map(name => ({ title: name })),
            loading: false,
          };
        })
      );
  };

  onResultSelect = (e, { result: { title: cardName } }) => {
    this.props.onCardSelected(cardName);
    this.setState({ results: [], value: '' });
  };

  componentDidMount() {
    presser.on('search', this.focus);
    presser.on('nextCard', this.blur);
    presser.on('previousCard', this.blur);
  }

  componentWillUnmount() {
    presser.off('search', this.focus);
    presser.off('nextCard', this.blur);
    presser.off('previousCard', this.blur);
  }

  render() {
    const { results, loading, value } = this.state;
    return (
      <Segment raised>
        <Search
          results={results}
          fluid
          input={
            <Input
              fluid
              input={{
                className: '',
                tabIndex: '0',
                autoComplete: 'off',
                placeholder: 'Find a card...',
                autoFocus: true,
                ref: input => (this.input = input),
              }}
            />
          }
          loading={loading}
          minCharacters={3}
          noResultsMessage="No cards found."
          onSearchChange={this.onSearchChange}
          onResultSelect={this.onResultSelect}
          value={value}
        />
      </Segment>
    );
  }
}
