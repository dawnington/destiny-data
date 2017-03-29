import React from 'react';
import SearchBar from './SearchBar';
import PlayerActions from '../actions/PlayerActions';
import PlayerStore from '../stores/PlayerStore';
import ChartOptions from './ChartOptions';
import ContentClear from 'material-ui/svg-icons/content/clear';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn } from 'material-ui/Table';

const colors = ['#EDC951', '#CC333F', '#00A0B0'];

const styles = {
  table: {
    backgroundColor: '#1f1e26',
    fontFamily: 'inherit',
  },
  rowColumn: {
    color: '#f0f0f1',
  },
  iconColumn: {
    width: '50px',
    paddingLeft: '0px',
  },
  button: {
    marginTop: '10px',
  },
};

const PlayerTable = React.createClass({
  getInitialState() {
    return { players: PlayerStore.all(), full: false };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    const full = (PlayerStore.count() === 3);
    this.setState({ players: PlayerStore.all(), full });
  },
  showOptions() {
    if (PlayerStore.count() > 0) {
      return <ChartOptions />;
    }
    return <div></div>;
  },
  getAverageKD(player) {
    return (player.kills / player.deaths).toFixed(2);
  },
  removePlayer(username) {
    PlayerActions.removePlayer(username);
  },
  render() {
    const players = this.state.players;
    return (
      <div className="legend">
        <SearchBar />
        <Table
          style={styles.table}
          selectable={false}
        >
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={styles.rowColumn}>Username</TableHeaderColumn>
              <TableHeaderColumn style={styles.rowColumn}>Average K/D</TableHeaderColumn>
              <TableHeaderColumn style={styles.iconColumn} />
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              Object.keys(players).map((username, idx) => {
                return (
                  <TableRow
                    style={{ color: colors[idx] }}
                    key={idx}
                  >
                    <TableRowColumn>{username}</TableRowColumn>
                    <TableRowColumn>{this.getAverageKD(players[username])}</TableRowColumn>
                    <TableRowColumn style={styles.iconColumn}>
                      <ContentClear
                        onClick={() => this.removePlayer(username)}
                        style={{ cursor: 'pointer' }}
                      />
                    </TableRowColumn>
                  </TableRow>
                );
              })
             }
          </TableBody>
        </Table>
        {this.showOptions()}
      </div>
    );
  },
});

export default PlayerTable;
