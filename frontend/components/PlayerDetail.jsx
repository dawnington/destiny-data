import React from 'react';
import { hashHistory } from 'react-router';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import StatsUtil from '../util/StatsUtil';

const PlayerDetail = React.createClass({
  getAverageKD() {
    const player = this.props.player;
    return (player.kills / player.deaths).toFixed(2);
  },
  removePlayer() {
    PlayerActions.removePlayer(this.props.username);
    this.checkForEmpty();
  },
  checkForEmpty() {
    if (PlayerStore.count() === 0) { hashHistory.push('/'); }
  },
  render() {
    const player = this.props.player;
    return (
      <div className="player-detail">
        <i className="fa fa-stop" style={{color: this.props.color}}></i>
          <li className="detail-username">{this.props.username}</li>
          <li className="detailKD">Average K/D: {this.getAverageKD()}</li>
        <i className="fa fa-times" onClick={this.removePlayer}></i>
      </div>
    );
  },
});

export default PlayerDetail;
