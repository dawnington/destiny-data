import React from 'react';
import Legend from './Legend';
import { Col } from 'react-bootstrap';

const Main = React.createClass({
  getInitialState() {
    return { path: window.location.pathname };
  },
  componentDidMount() {
    document.getElementById('wrapper').style.display = 'none';
  },
  render() {
    return (
      <div className="main">
        <Col className="content" xs={12} md={8}>
          {this.props.children}
        </Col>
        <Col xs={6} md={4}>
          <Legend {...this.props} />
        </Col>
      </div>
    );
  },
});

export default Main;
