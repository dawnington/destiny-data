import React from 'react';
import { Table } from 'react-bootstrap';

const PlayerStats = React.createClass({
  render() {
    const player = this.props.player;
    return (
      <div>{player}</div>
    );
  },
});

export default PlayerStats;
