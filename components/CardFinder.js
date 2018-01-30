import { Component } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import Tile from './Tile';

const getSuggestionValue = suggestion => suggestion;
const renderSuggestion = suggestion => suggestion;

export default class CardFinder extends Component {
  static propTypes = {
    onCardSelected: PropTypes.func.isRequired,
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionSelected = (e, { suggestion }) => {
    this.setState({ value: '', suggestions: [] });
    this.props.onCardSelected(suggestion);
  };

  shouldRenderSuggestions = value => {
    return value.trim().length > 2;
  };

  onSuggestionsFetchRequested = ({ value, reason }) => {
    if (value.length < 3 || reason === 'suggestion-selected') {
      this.setState({
        suggestions: [],
      });
      return;
    }

    fetch(`https://api.scryfall.com/cards/autocomplete?q=${value}`)
      .then(result => result.json())
      .then(result =>
        this.setState({
          suggestions: result.data || [],
        })
      );
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      autoFocus: true,
      placeholder: 'Find a card...',
      value,
      onChange: this.onChange,
    };
    return (
      <Tile>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          alwaysRenderSuggestions
        />
        <style jsx global>{`
          .react-autosuggest__container {
            position: relative;
          }
          .react-autosuggest__input {
            width: 100%;
            padding: 12px;
            border: 1px solid #333;
            border-radius: 4px;
            background: lightgrey;
            font-size: 16px;
          }
          .react-autosuggest__input--open {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
          .react-autosuggest__input--focused {
            outline: none;
          }
          .react-autosuggest__suggestions-container--open {
            position: absolute;
            top: 43px;
            width: 100%;
            border: 1px solid #333;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .react-autosuggest__suggestions-list {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
          .react-autosuggest__suggestion {
            padding: 12px;
            cursor: pointer;
            overflow: hidden;
            background: lightgrey;
          }
          .react-autosuggest__suggestion:last-of-type {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          .react-autosuggest__suggestion--highlighted {
            background: darkgrey;
          }
        `}</style>
      </Tile>
    );
  }
}
