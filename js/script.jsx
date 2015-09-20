var StarsFrame = React.createClass({
  render: function() {
    var stars = [];
    for(var i = 0; i < this.props.numStars; i++) {
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
    var disabled = (this.props.selectedNumbers.length == 0),
        button,
        correct = this.props.correct;
    switch(correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        button = (
          <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
        );
    }
    return (
      <div id="button-frame">
        {button}
        <br />
        <button className="btn btn-warning btn-xs" onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh"></span> {this.props.redraws}
        </button>
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
      className += " used-" + (this.props.usedNumbers.indexOf(i) != -1);
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
    return {
      selectedNumbers: [],
      usedNumbers: [],
      numStars: Math.ceil(9*Math.random()),
      correct: null,
      redraws: 5
    };
  },
  selectNumber: function(num) {
    if (this.state.selectedNumbers.indexOf(num) == -1) {
      this.setState({selectedNumbers: this.state.selectedNumbers.concat(num), correct: null});
    }
  },
  unselectNumber: function(num) {
    var selectedNumbers = this.state.selectedNumbers,
        ind = selectedNumbers.indexOf(num);
    
    selectedNumbers.splice(ind, 1);
    this.setState({selectedNumbers: selectedNumbers, correct: null});
  },
  checkAnswer: function() {
    var answer = this.state.selectedNumbers.reduce(function(p, n) {
      return p + n;
    }, 0);
    
    this.setState({correct: (answer == this.state.numStars)});
  },
  acceptAnswer: function() {
    var usedNumbers = this.state.usedNumbers;
    this.setState({
      usedNumbers: this.state.usedNumbers.concat(this.state.selectedNumbers),
      selectedNumbers: [],
      numStars: Math.ceil(9*Math.random()),
      correct: null
    });
  },
  redraw: function() {
    var redraws = this.state.redraws;
    if (redraws > 0) {
      this.setState({
        selectedNumbers: [],
        numStars: Math.ceil(9*Math.random()),
        redraws: redraws - 1,
        correct: null
      })
    }
  },
  render: function() {
    var selectedNumbers = this.state.selectedNumbers;
    return (
      <div id="game">
        <h1>Play Nine</h1>
        <hr />
        <div className="clearfix">
          <StarsFrame numStars={this.state.numStars} />
          <ButtonFrame
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            correct={this.state.correct}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={this.state.redraws}
          />
          <AnswerFrame selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
        </div>
        <NumbersFrame selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={this.state.usedNumbers} />
      </div>
    );
  }
});

React.render(
  <Game />,
  document.getElementById('mainContainer')
);