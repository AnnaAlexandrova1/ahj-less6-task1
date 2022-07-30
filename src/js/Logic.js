import Card from './Card';

export default class Logic {
  constructor(board) {
    this.board = board;
    this.state = [];
  }

  init() {
    this.board.getBoard();
  }
}
