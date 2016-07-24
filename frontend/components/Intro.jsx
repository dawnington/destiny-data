import React from 'react';

const Intro = React.createClass({
  render() {
    return (
      <div className="intro">
        <h1>Welcome to Destiny Data!</h1>
        <p>
          This is a simple site I made to display PvP stats, inspired by this <a href="https://www.reddit.com/r/CruciblePlaybook/comments/4rp01r/ideal_breakdown_of_kill_types/">Reddit thread</a>.
        </p>
        <p>Use the search bar to find and compare up to three users.</p>
        <p>I'll be working on more features (such as breaking down subcategories), so check back soon!</p>
        <p>You can fork the repo <a href="https://github.com/dawnington/destiny-data">here</a> (it's kind of a mess though).</p>
        <p>Thanks for stopping by! (ﾉ^ヮ^)ﾉ*:・ﾟ✧</p>
      </div>
    );
  },
});

export default Intro;
