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
        <Col className="content" xs={12} md={7}>
          {this.props.children}
        </Col>
        <Col xs={12} md={5}>
          <Legend {...this.props} />
        </Col>
      </div>
    );
  },
});

export default Main;
