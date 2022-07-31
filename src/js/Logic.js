import Card from './Card';
import Storage from './Storage';

export default class Logic {
  constructor(board) {
    this.board = board;
    this.state = [];
  }

  init() {
    this.board.getBoard();
    this.container = document.querySelector('.container');
    this.onClickAddCard();
    this.container.addEventListener('click', this.onclickDeleteCard.bind(this));
    this.container.addEventListener('click', this.onClickPinCard.bind(this));
    this.container.addEventListener('click', this.deletePinnedCard.bind(this));
    this.container.addEventListener('mouseover', (e) => this.onMouseOver(e));
    this.container.addEventListener('mouseout', (e) => this.onMouseOut(e));
    this.container.addEventListener('mousedown', (e) => this.dragDown(e));
    this.container.addEventListener('mousemove', (e) => this.dragMove(e));
    this.container.addEventListener('mouseup', (e) => this.dragUp(e));
    this.container.addEventListener('mouseleave', (e) => this.dragLeave(e));
    this.storage = new Storage();
    this.state = this.storage.getPinCards();
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
        elem.parentElement.classList.add('item_active');
        elem.parentElement.insertAdjacentHTML('beforeend', this.constructor.creatingCard);
        elem.classList.add('hidden');
      });
    });
  }

  // удаление формы с текстом(внопка отмена)
  onclickDeleteCard(event) {
    event.preventDefault();
    if (!event.target.classList.contains('cancel_item-btn')) {
      return;
    }
    if (event.target.classList.contains('cancel_item-btn')) {
      event.target.parentElement.closest('.form').remove();
      // event.target.parentElement.closest('.textarea').remove();
    }

    document.querySelectorAll('.add_btn').forEach((item) => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
    });
  }

  // добавить карточку с заданием
  onClickPinCard(event) {
    event.preventDefault();
    this.card = new Card();
    const textArea = document.querySelector('.textarea');
    if (!event.target.classList.contains('add_item-btn') || textArea.value === '') {
      return;
    }

    const type = event.currentTarget.querySelector('.item_active').dataset.card;
    this.card.init();

    const pinLoad = {
      description: this.card.task,
      type,
    };

    this.state.push(pinLoad);
    this.storage.save(this.state);
    event.target.parentElement.closest('.form').remove();

    document.querySelectorAll('.add_btn').forEach((item) => {
      if (item.classList.contains('hidden')) {
        item.classList.remove('hidden');
      }
    });
  }

  // удалить карточку с заданием
  deletePinnedCard(event) {
    event.preventDefault();

    if (!event.target.classList.contains('removeItem')) {
      return;
    }

    const pin = event.target.previousElementSibling.textcontent;
    const pinItem = this.state.findIndex((item) => item.description === pin);

    this.state.splice(pinItem, 1);
    this.storage.save(this.state);

    event.target.parentElement.remove();
  }

  // при наведении мыши показывать крестик
  onMouseOver(event) {
    const target = event.target.closest('.list_item');
    if (!target) {
      return;
    }

    const btn = target.querySelector('.removeItem');
    btn.classList.toggle('hidden');
  }

  // скрывать крестик если мышь пропала с поля
  onMouseOut(event) {
    const btn = event.target.querySelector('.removeItem');
    if (!btn) {
      return;
    }
    btn.classList.add('hidden');
  }

  // нажатие мыши при захвате карточки
  dragDown(event) {
    if (event.target.classList.contains('removeItem')) {
      return;
    }

    const dragItem = event.target.closest('.list_item');

    if (!dragItem) {
      return;
    }
    event.preventDefault();

    document.body.style.cursor = 'grabbing';
    this.dropEl = dragItem.cloneNode(true);

    const {
      width,
      height,
      left,
      top,
    } = dragItem.getBoundingClientRect();

    this.coordX = event.clientX - left;
    this.coordY = event.clientY - top;
    this.dropEl.classList.add('dragged');
    this.dropEl.style.width = `${width}px`;
    this.dropEl.style.height = `${height}px`;

    document.body.appendChild(this.dropEl);
    this.dropEl.style.top = `${top}px`;
    this.dropEl.style.left = `${left}px`;
    this.dragEl = dragItem;
    this.dragEl.classList.add('hidden');
  }

  // при движении мыши
  dragMove(event) {
    event.preventDefault();
    if (!this.dropEl) {
      return;
    }

    document.body.style.cursor = 'grabbing';
    this.dropEl.style.left = `${event.pageX - this.coordX}px`;
    this.dropEl.style.top = `${event.pageY - this.coordY}px`;
  }

  dragUp(event) {
    if (!this.dragEl || !this.dropEl) {
      return;
    }
    event.preventDefault();
    document.body.style.cursor = 'auto';

    const closest = document.elementFromPoint(event.clientX, event.clientY).closest('.list_item');
    const boardItem = event.target.closest('.board_item');

    if (!boardItem) {
      this.dropEl.remove();
      this.dragEl.classList.remove('hidden');
      return;
    }

    boardItem.insertBefore(this.dragEl, closest);
    const currentDragEl = this.dragEl.querySelector('.task_title').textContent;

    const pinIndex = this.state.findIndex((item) => item.description === currentDragEl);
    this.state.splice(pinIndex, 1);
    this.storage.save(this.state);

    const pinLoad = {
      description: currentDragEl,
      type: boardItem.dataset.cell,
    };

    this.state.push(pinLoad);
    this.storage.save(this.state);

    this.dragEl.classList.remove('hidden');
    this.dropEl.remove();
    this.dropEl = null;
  }

  dragLeave() {
    if (!this.dropEl) {
      return;
    }

    this.dragEl.classList.remove('hidden');
    this.dropEl.remove();
    this.dropEl = null;
    this.dragEl = null;
  }
}
