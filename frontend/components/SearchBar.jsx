import React from 'react';
import { hashHistory } from 'react-router';
import PlayerActions from '../actions/PlayerActions';
import { RadioGroup, Radio } from 'react-radio-group';

const SearchBar = React.createClass({
  getInitialState() {
    return { username: '', platform: '2' };
  },
  onPlatformChange(value) {
    this.setState({ platform: value });
  },
  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    PlayerActions.addPlayer(this.state.username, this.state.platform);
    this.checkForRedirect();
    this.setState({ username: '' });
  },
  checkForRedirect() {
    if (this.props.pathname === '/') {
      hashHistory.push('overall');
    }
  },
  render() {
    return (
      <div className="search-bar">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <RadioGroup
            name="platform"
            selectedValue={this.state.platform}
            onChange={this.onPlatformChange}
            className="platform-radio-group"
          >
            <label>
              <Radio value="2" /> PS
            </label>
            &nbsp;
            <label>
              <Radio value="1" /> XBOX
            </label>
          </RadioGroup>
          <input
            type="text"
            placeholder="Gamertag"
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
          <button>Search</button>
        </form>
      </div>
    );
  },
});

export default SearchBar;
