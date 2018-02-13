import React, { Component } from 'react';
import SvgIcon from './SvgIcon'
import Autosuggest from 'react-autosuggest';

class ResourceExistingSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
  		value: '',
  		suggestions: this.props.resources,
    };
	}

	render() {
		const { value, suggestions } = this.state;

		const inputProps = {
  		placeholder: 'Search',
  		value,
  		onChange: this.onChange.bind(this)
    };

		return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={(props) => this.onSuggestionsFetchRequested(props)}
          onSuggestionSelected={(props) => this.onSuggestionSelected(props)}
          onSuggestionsClearRequested={() => {}}
          renderSuggestion={(props) => this.renderSuggestion(props)}
          getSuggestionValue={(props) => this.getSuggestionValue(props)}
          focusFirstSuggestion = {true}
          alwaysRenderSuggestions = {true}
          inputProps={inputProps}
        />
      </div>
    );
	}

	onChange(event, { newValue, method }) {
    console.log("on change", event, newValue, method)

		this.setState({
      value: newValue
    });
	}

	// Autosuggest will call this function every time you need to update suggestions.
	onSuggestionsFetchRequested({value}) {
		console.log("updating suggestions", value)

    this.setState({
      	suggestions: this.getSuggestions(value),
    });
	}

  onSuggestionSelected(event, props) {
    console.log("selected", props, event)
    this.setState({
			value: ''
		})
    console.log("dispatching action to set resource data")
	}

	getSuggestions(value) {
    console.log("getting suggestions", value)
    const {resources} = this.props
    if (!value) { return resources }

    const inputValue = value.trim().toLowerCase();
	  const inputLength = inputValue.length;

    return resources.filter(resource => {
      return resource.title.indexOf(inputValue) > -1
    })

	}

	getSuggestionValue(value) {
    console.log("getting suggestion value", value)
    return value.path
	}

  renderSuggestion({title, resource_type}) {
    console.log("rendering suggestion")
    return (
      <div className="search__results-list__item">
        <h5 className="search__results-list__item__title">{title}</h5>
        <h5 className="search__results-list__item__subheading">{resource_type}</h5>
      </div>
    )

	}
}

export default ResourceExistingSearch
