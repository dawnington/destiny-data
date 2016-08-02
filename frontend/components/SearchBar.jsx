import React from 'react';
import { hashHistory } from 'react-router';
import ErrorStore from '../stores/ErrorStore';
import ErrorActions from '../actions/ErrorActions';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, Form, FormGroup, FormControl, Alert } from 'react-bootstrap';

const SearchBar = React.createClass({
  getInitialState() {
    return { username: '', platform: '2', isLoading: false, error: false };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
  },
  componentWillUnmount() {
    this.storeListener.remove();
    this.errorListener.remove();
  },
  onPlatformChange(value) {
    this.setState({ platform: value });
  },
  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  },
  _onChange() {
    this.setState({ isLoading: false });
  },
  _onErrorChange() {
    this.setState({ error: ErrorStore.hasError(), isLoading: false });
    if (ErrorStore.hasError()) { setTimeout(this.clearError, 3000); }
  },
  clearError() {
    ErrorActions.clearError();
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username === '') {
      ErrorActions.addError();
    } else {
      PlayerActions.addPlayer(this.state.username, this.state.platform);
      this.checkForRedirect();
      this.setState({ username: '', isLoading: true });
    }
  },
  checkForRedirect() {
    if (this.props.pathname === '/') {
      hashHistory.push('overall');
    }
  },
  showAlert() {
    if (this.state.error) {
      return (
        <Alert bsStyle="danger">
          Player not found
        </Alert>
      );
    }
    return <div></div>;
  },
  buttonText() {
    if (PlayerStore.count() === 3) {
      return 'Full';
    } else if (this.state.isLoading) {
      return 'Searching...';
    } else {
      return 'Add Player';
    }
  },
  render() {
    const isLoading = this.state.isLoading;
    const disabled = PlayerStore.count() === 3;
    return (
      <div>
        {this.showAlert()}
        <Form inline onSubmit={this.handleSubmit} className="search-form">
          <FormGroup>
            <RadioGroup
              name="platform"
              selectedValue={this.state.platform}
              onChange={this.onPlatformChange}
              className="platform-radio-group"
            >
              <label>
                <Radio value="2" /> PS
              </label>
              {'   '}
              <label>
                <Radio value="1" /> XBOX
              </label>
            </RadioGroup>
          </FormGroup>
          {' '}
          <FormGroup controlId="formInlineName">
            <FormControl
              bsSize="small"
              type="text"
              value={this.state.username}
              placeholder="Enter a username"
              onChange={this.onUsernameChange}
              className="username-input"
            />
          </FormGroup>
          {' '}
          <Button
            type="submit"
            disabled={isLoading || disabled}
            className="search-button"
          >
            {this.buttonText()}
          </Button>
        </Form>
      </div>
    );
  },
});

export default SearchBar;
