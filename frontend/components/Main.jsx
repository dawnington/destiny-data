import React from 'react';
import PlayerTable from './PlayerTable';
import { Col } from 'react-bootstrap';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import StatsChart from './StatsChart';

const Main = React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="main">
          <Col xs={12} md={5}>
            <PlayerTable {...this.props} />
          </Col>
          <Col className="content" xs={12} md={7}>
            <StatsChart />
          </Col>
        </div>
      </MuiThemeProvider>
    );
  },
});

export default Main;
