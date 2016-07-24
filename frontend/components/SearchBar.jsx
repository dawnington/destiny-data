import React from 'react';
import PlayerActions from '../actions/PlayerActions';

const SearchBar = React.createClass({
  getInitialState() {
    return { username: '', platform: 2 };
  },
  onPlatformChange(e) {
    this.setState({ platform: e.target.value });
  },
  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    PlayerActions.addPlayer(this.state.username, this.state.platform);
    this.setState({ username: '' });
  },
  render() {
    return (
      <div className="search-bar">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <select name="platform" onChange={this.onPlatformChange}>
            <option value="2">PS4</option>
            <option value="1">Xbox</option>
          </select>
          <input
            type="text"
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
