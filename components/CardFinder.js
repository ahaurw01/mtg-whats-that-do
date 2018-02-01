import { Component } from 'react';
import PropTypes from 'prop-types';
import { Search, Input, Segment } from 'semantic-ui-react';

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
    };
  }

  onSearchChange = (e, { value }) => {
    this.setState({ value });
    if (value.length < 3) {
      this.setState({ results: [] });
      return;
    }

    this.setState({ loading: true });
    fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`)
      .then(result => result.json())
      .then(result =>
        this.setState({
          results: (result.data || []).map(name => ({ title: name })),
          loading: false,
        })
      );
  };

  onResultSelect = (e, { result: { title: cardName } }) => {
    this.props.onCardSelected(cardName);
    this.setState({ results: [], value: '' });
  };

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
