import React from 'react';
import PlayerActions from '../actions/PlayerActions';
import FlatButton from 'material-ui/FlatButton';
import PlayerStore from '../stores/PlayerStore';

const style = {
  fontFamily: 'Titillium Web',
  borderRadius: '5px',
};

const ChartOptions = React.createClass({
  getInitialState() {
    return { currentFilter: 'overall' };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
  },
  _onChange() {
    this.setState({ currentFilter: PlayerStore.filter() });
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  changeFilter(filter) {
    PlayerActions.changeFilter(filter);
  },
  activeButton(label) {
    if (label === this.state.currentFilter) {
      switch (label) {
        case 'overall':
          return '#913734';
        case 'primary':
          return '#5785a2';
        case 'secondary':
          return '#58477e';
        case 'heavy':
          return '#dfb836';
        default:
          break;
      }
    }
  },
  render() {
    return (
      <div className="chart-options-group">
        <FlatButton
          label="Overall"
          onClick={() => this.changeFilter('overall')}
          style={style}
          hoverColor="#913734"
          backgroundColor={this.activeButton('overall')}
        />
        <FlatButton
          label="Primary"
          onClick={() => this.changeFilter('primary')}
          style={style}
          hoverColor="#5785a2"
          backgroundColor={this.activeButton('primary')}
        />
        <FlatButton
          label="Secondary"
          onClick={() => this.changeFilter('secondary')}
          style={style}
          hoverColor="#58477e"
          backgroundColor={this.activeButton('secondary')}
        />
        <FlatButton
          label="Heavy"
          onClick={() => this.changeFilter('heavy')}
          style={style}
          hoverColor="#dfb836"
          backgroundColor={this.activeButton('heavy')}
        />
      </div>
    );
  },
});

export default ChartOptions;
