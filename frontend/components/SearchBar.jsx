import React from 'react';
import { hashHistory } from 'react-router';
import PlayerActions from '../actions/PlayerActions';
import { RadioGroup, Radio } from 'react-radio-group';
import { Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

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
      <Form inline onSubmit={this.handleSubmit}>
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
          />
        </FormGroup>
        {' '}
        <Button type="submit">Search</Button>
      </Form>
    );
  },
});

export default SearchBar;
