export default class Board {
  constructor(container) {
    this.container = container;
    this.board = undefined;
  }

  createBoard() {
    this.board = document.createElement('div');
    this.board.classList.add('board');
    this.bindToDom();
  }

  bindToDom() {
    this.container.appendChild(this.board);
    this.board.insertAdjacentHTML('afterbegin', this.constructor.markup);
  }

  static get markup() {
    return `
    <div class="board_item item_todo">
        <h1 class="title">TODO</h1>
            <div class="add_btn">
                <span> + </span>
                Add card
            </div>
    </div>
    <div class="board_item item_progress">
        <h1 class="title">IN PROGRESS</h1>
            <div class="add_btn">
                <span> + </span>
                Add card
            </div>
    </div>
    <div class="board_item item_done">
        <h1 class="title">DONE</h1>
            <div class="add_btn">
                <span> + </span>
                Add card
            </div>
    </div>`;
  }

  getBoard() {
    this.createBoard();
    return this.board;
  }
}
