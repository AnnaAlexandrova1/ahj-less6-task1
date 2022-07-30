import Card from './Card';

export default class Logic {
  constructor(board) {
    this.board = board;
    this.state = [];
  }

  init() {
    this.board.getBoard();
    this.container = document.querySelector('.container');
    this.onClickAddCard();
  }

  static get creatingCard() {
    return `
    <div class="form">
    <input class="textarea" placeholder='Enter your task here'>
    </input>
    <div class="buttons">
        <button class="add_item-btn">Add</button>
        <button class="cancel_item-btn">Cancel</button>
    </div>
</div>`;
  }

  onClickAddCard() {
    this.addCardBtn = document.querySelectorAll('.add_btn');
    this.addCardBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        console.log(elem.parentElement);
        elem.parentElement.classList.add('item_active');
        elem.parentElement.insertAdjacentHTML('beforeend', this.constructor.creatingCard);
        elem.classList.add('hidden');
      });
    });
  }
}
