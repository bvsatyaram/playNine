var StarsFrame = React.createClass({
  render: function() {
    var numStars = Math.ceil(9*Math.random());
    var stars = [];
    for(var i = 0; i < numStars; i++) {
      stars.push(
        <div className="glyphicon glyphicon-star"></div>
      );
    };
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
});

var ButtonFrame = React.createClass({
  render: function() {
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg">=</button>
      </div>
    );
  }
});

var AnswerFrame = React.createClass({
  render: function() {
    return (
      <div id="answer-frame">
        <div className="well">
          ...
        </div>
      </div>
    );
  }
});

var NumbersFrame = React.createClass({
  render: function() {
    var numbers = [];
    for(var i = 1; i <= 9; i++) {
      numbers.push(
        <div className="number">{i}</div>
      );
    }
    
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});

var Game = React.createClass({
  render: function() {
    return (
      <div id="game">
        <h1>Play Nine</h1>
        <hr />
        <div className="clearfix">
          <StarsFrame />
          <ButtonFrame />
          <AnswerFrame />
        </div>
        <NumbersFrame />
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('mainContainer')
);