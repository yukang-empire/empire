import React from 'react';
import './App.css';

function Square (props) {
  return (
    <button className={`square ${props.yellow}`} onClick={props.onClick}>{props.value}</button>
  )
};

class Board extends React.Component {

  render () {
    let yellow = 'yellow';
    let chess = [];
    for (let i = 0; i < 3; i++) {
      let winner = JSON.parse(sessionStorage.getItem('winner')) || [];
      let btn = [];
      let arr = [3*i, 3*i+1, 3*i+2];
      for (let j = 0; j < 3; j++) {
        let index = arr[j];
        if (winner[j] === index) {
          btn.push(
            <Square key={index} yellow={yellow} value={this.props.square[index]} onClick={() => {this.props.onClick(index)}} />
          );
        }else {
          btn.push(
            <Square key={index} value={this.props.square[index]} onClick={() => {this.props.onClick(index)}} />
          );
        }
      };
      chess.push(
        <div key={i} className='board-row'>
          {btn}
        </div>
      );
    };
    sessionStorage.removeItem('winner');

    return (
      <div>
        <div className='status'>{this.props.status}</div>
        {chess}
      </div>
    )
  }
};

function calculateWinner(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      sessionStorage.setItem('winner', JSON.stringify(lines[i]));
      return square[a];
    };
  };
  return null;
};

class app extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: [
        {square: Array(9).fill(null)}
      ],
      is_next: true,
      step_num: 0,
      is_click: false,
      is_sort: false,
      winner: null
    };
  };

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.step_num + 1);
    const current = history[history.length - 1];
    var lyk = current.square.slice();
    if (lyk[i]) {
      return;
    };
    if (calculateWinner(lyk)) {
      sessionStorage.removeItem('winner');
      return;
    };
    lyk[i] = this.state.is_next ? 'X' : 'O';
    let coor = null;
    switch (i) {
      case 0:
        coor = '(1, 1)';
        break;
      case 1:
        coor = '(1, 2)';
        break;
      case 2:
        coor = '(1, 3)';
        break;
      case  3:
        coor = '(2, 1)';
        break;
      case 4:
        coor = '(2, 2)';
        break;
      case 5:
        coor = '(2, 3)';
        break;
      case 6:
        coor = '(3, 1)';
        break;
      case 7:
        coor = '(3, 2)';
        break;
      case 8:
        coor = '(3, 3)';
        break;
      default:
        coor = null;
    };
    lyk[9] = coor;
    this.setState({
      history: history.concat([
        {square: lyk}
      ]),
      step_num: history.length,
      is_next: !this.state.is_next,
      is_click: false
    });
  };

  jump (step) {
    this.setState({
      step_num: step,
      is_next: (step % 2) === 0,
      is_click: true
    });
    
  };

  sheng_jiang () {
    this.setState({
      is_sort: !this.state.is_sort
    });
  };

  render () {
    
    const history = this.state.history;
    const current = history[this.state.step_num];
    const winner = calculateWinner(current.square);

    const length = history.length;
    const moves = [];
    var desc = null;
    var bold = '';
    if (this.state.is_sort) {
      for (let i = length - 1; i > -1; i--) {
        desc = i ? 'go to move #' + i + history[i].square[9]: 'go to start';
        bold = '';
        if (i && this.state.is_click && this.state.step_num === i) {
          bold = 'bold';
        };
        moves.push(<li key={i}><button className={bold} onClick={()=>{this.jump(i)}}>{(i+1) + '.' + desc}</button></li>);
      };
    }else {
      for (let i = 0; i < length; i++) {
        desc = i ? 'go to move #' + i + history[i].square[9]: 'go to start';
        bold = '';
        if (i && this.state.is_click && this.state.step_num === i) {
          bold = 'bold';
        };
        moves.push(<li key={i}><button className={bold} onClick={()=>{this.jump(i)}}>{(i+1) + '.' + desc}</button></li>);
      };
    };

    let status = null;
    if (winner) {
      status = 'Winner: ' + winner;
    }else if (false) {
      status = '平局';
    }else {
      status = 'Next player: ' + (this.state.is_next ? 'X' : 'O');
    };

    return (
      <div className='game'>
        <div className='game-board'>
          <Board square={current.square} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ul>{moves}</ul>
          <button onClick={() => {this.sheng_jiang()}}>升/降序</button>
        </div>
      </div>
    )
  }
};

export default app;
