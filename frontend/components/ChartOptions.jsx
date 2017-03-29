import React from 'react';
import PlayerActions from '../actions/PlayerActions';
import FlatButton from 'material-ui/FlatButton';

const style = {
  fontFamily: 'Titillium Web',
}

const ChartOptions = React.createClass({
  changeFilter(filter) {
    PlayerActions.changeFilter(filter);
  },
  render() {
    return (
      <div className="chart-options-group">
        <FlatButton
          label="Overall"
          onClick={() => this.changeFilter('overall')}
          style={style}
          hoverColor="#913734"
        />
        <FlatButton
          label="Primary"
          onClick={() => this.changeFilter('primary')}
          style={style}
          hoverColor="#5785a2"
        />
        <FlatButton
          label="Secondary"
          onClick={() => this.changeFilter('secondary')}
          style={style}
          hoverColor="#58477e"
        />
        <FlatButton
          label="Heavy"
          onClick={() => this.changeFilter('heavy')}
          style={style}
          hoverColor="#ba9b18"
        />
      </div>
    );
  },
});

export default ChartOptions;
