import React from 'react';
import PlayerActions from '../actions/PlayerActions';
import StatsUtil from '../util/StatsUtil';

const PlayerDetail = React.createClass({
  getAverageKD() {
    const player = this.props.player;
    return (player.kills / player.deaths).toFixed(2);
  },
  removePlayer() {
    PlayerActions.removePlayer(this.props.username);
  },
  render() {
    const player = this.props.player;
    return (
      <div className="player-detail">
        <i className="fa fa-stop" style={{color: this.props.color}}></i>
          <li>{this.props.username}</li>
          <li>Average K/D: {this.getAverageKD()}</li>
        <i className="fa fa-times" onClick={this.removePlayer}></i>
      </div>
    );
  },
});

export default PlayerDetail;
