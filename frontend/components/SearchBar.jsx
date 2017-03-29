import React from 'react';
import { hashHistory } from 'react-router';
import ErrorStore from '../stores/ErrorStore';
import ErrorActions from '../actions/ErrorActions';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import { Form, Alert } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

const styles = {
  hint: {
    color: '#9c9797',
    fontFamily: 'Titillium Web',
  },
  button: {
    fontFamily: 'Titillium Web',
    backgroundColor: '#00bcd4',
    borderRadius: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  toggle: {
    width: '20%',
  },
  toggleLabel: {
    fontFamily: 'Titillium Web',
  },
  thumbStyle: {
    backgroundColor: '#00bcd4',
  },
  thumbSwitchedStyle: {
    backgroundColor: '#0dcb3d',
  },
  trackStyle: {
    backgroundColor: 'rgba(0, 151, 167, 0.498039)',
  },
  trackSwitchedStyle: {
    backgroundColor: 'rgba(13, 203, 61, 0.49)',
  },
};

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
  onPlatformChange() {
    const oldPlatform = this.state.platform;
    const newPlatform = oldPlatform === '1' ? '2' : '1';
    this.setState({ platform: newPlatform });
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
    }
    return 'Add Player';
  },
  toggleText() {
    if (this.state.platform === '2') {
      return 'PS4';
    }
    return 'XBOX';
  },
  toggleColor() {
    if (this.state.platform === '2') {
      return '#00bcd4';
    }
    return '#0dcb3d';
  },
  render() {
    const isLoading = this.state.isLoading;
    const disabled = PlayerStore.count() === 3;
    return (
      <div>
        {this.showAlert()}
        <Form inline onSubmit={this.handleSubmit} className="search-form">
          <Toggle
            label={this.toggleText()}
            style={styles.toggle}
            onToggle={this.onPlatformChange}
            labelStyle={styles.toggleLabel}
            thumbStyle={styles.thumbStyle}
            thumbSwitchedStyle={styles.thumbSwitchedStyle}
            trackStyle={styles.trackStyle}
            trackSwitchedStyle={styles.trackSwitchedStyle}
          />
          <TextField
            hintText="Username (e.g. DeeJ_BNG)"
            hintStyle={styles.hint}
            value={this.state.username}
            onChange={this.onUsernameChange}
          />
          <FlatButton
            type="submit"
            disabled={isLoading || disabled}
            style={styles.button}
          >
            {this.buttonText()}
          </FlatButton>
        </Form>
      </div>
    );
  },
});

export default SearchBar;
