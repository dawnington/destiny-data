import React from 'react';
import Legend from './Legend';
import { Col } from 'react-bootstrap';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import StatsChart from './StatsChart';
import PlayerStore from '../stores/PlayerStore';
import Intro from './Intro';

const Main = React.createClass({
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className="main">
          <Col xs={12} md={5}>
            <Legend {...this.props} />
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
