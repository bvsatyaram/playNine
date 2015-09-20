var StarsFrame = React.createClass({
  getInitialState: function() {
    return {numStars: Math.ceil(9*Math.random())};
  },
  render: function() {
    var numStars = this.state.numStars;
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
    var disabled = (this.props.selectedNumbers.length == 0)
    return (
      <div id="button-frame">
        <button className="btn btn-primary btn-lg" disabled={disabled}>=</button>
      </div>
    );
  }
});

var AnswerFrame = React.createClass({
  render: function() {
    var numbers = [],
        props = this.props;
    this.props.selectedNumbers.forEach(function(num) {
      numbers.push(
        <div className="number" onClick={props.unselectNumber.bind(null, num)}>{num}</div>
      );
    });
    return (
      <div id="answer-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
});

var NumbersFrame = React.createClass({
  render: function() {
    var numbers = [], className;
    for(var i = 1; i <= 9; i++) {
      className = "number selected-" + (this.props.selectedNumbers.indexOf(i) != -1);
      numbers.push(
        <div className={className} onClick={this.props.selectNumber.bind(null, i)}>
          {i}
        </div>
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
  getInitialState: function() {
    return {selectedNumbers: []};
  },
  selectNumber: function(num) {
    if (this.state.selectedNumbers.indexOf(num) == -1) {
      this.setState({selectedNumbers: this.state.selectedNumbers.concat(num)});
    }
  },
  unselectNumber: function(num) {
    var selectedNumbers = this.state.selectedNumbers,
        ind = selectedNumbers.indexOf(num);
    
    selectedNumbers.splice(ind, 1);
    this.setState({selectedNumbers: selectedNumbers});
  },
  render: function() {
    var selectedNumbers = this.state.selectedNumbers;
    return (
      <div id="game">
        <h1>Play Nine</h1>
        <hr />
        <div className="clearfix">
          <StarsFrame />
          <ButtonFrame selectedNumbers={selectedNumbers} />
          <AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} />
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('mainContainer')
);