export default class Card {
  constructor(task) {
    this.task = task;
  }

  init() {
    this.bindToDOM();
  }

  static template(task) {
    return `
    <div draggable="true" class="list_item">
    <span clas="task_title">${task}</span>
    <button class="removeItem hidden"></button>
    </div>`;
  }

  bindToDOM() {
    this.item = document.querySelector('.item_active');
    this.pin = this.addTask(this.task);
    this.item.insertAdjacentHTML('beforeend', this.pin);
    this.item.classList.remove('item_active');
  }

  addTask() {
    const textarea = document.querySelector('.textarea');
    this.task = textarea.value.trim();

    if (this.task) {
      const text = this.constructor.template(this.task);
      return text;
    }
    return false;
  }
}
