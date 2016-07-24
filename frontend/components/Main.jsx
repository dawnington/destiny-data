import React from 'react';
import Legend from './Legend';

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
        <div className="content">
          {this.props.children}
          <Legend {...this.props} />
        </div>
      </div>
    );
  },
});

export default Main;
