var Game = React.createClass({
  render: function() {
    return (
      <div id="game">
        <h1>Play Nine</h1>
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('mainContainer')
);