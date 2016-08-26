import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Intro = React.createClass({
  render() {
    return (
      <Jumbotron className="intro">
        <h1>Welcome to Destiny Data!</h1>
        <p>
          This is a simple site I made to display PvP stats, inspired by this <a href="https://www.reddit.com/r/CruciblePlaybook/comments/4rp01r/ideal_breakdown_of_kill_types/">Reddit thread</a>.
        </p>
        <p>Use the search bar to find and compare up to three users.</p>
        <p>You can fork the repo <a href="https://github.com/dawnington/destiny-data">here</a>.</p>
        <p>If you want to carry me through Trials, my PSN is dawnington.</p>
        <p>If you want to hire me, you can find out more about me <a href="https://dawnington.github.io/">here</a>.</p>
        <p>Thanks for stopping by! (ﾉ^ヮ^)ﾉ*:・ﾟ✧</p>
      </Jumbotron>
    );
  },
});

export default Intro;
