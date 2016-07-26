import React from 'react';
import SearchBar from './SearchBar';
import PlayerDetail from './PlayerDetail';
import PlayerStore from '../stores/PlayerStore';
import ChartOptions from './ChartOptions';
import { Accordion, Panel } from 'react-bootstrap';

const colors = ['#EDC951', '#CC333F', '#00A0B0'];

const Legend = React.createClass({
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
  render() {
    const players = this.state.players;
    return (
      <div className="legend">
        <SearchBar pathname={this.props.location.pathname} />
        <Accordion>
          {
            Object.keys(players).map((username, idx) => {
              const header = <PlayerDetail username={username} player={players[username]} color={colors[idx]} key={idx} />;
              return <Panel header={header} key={idx} />;
            })
          }
        </Accordion>
        {this.showOptions()}
      </div>
    );
  },
});

export default Legend;
