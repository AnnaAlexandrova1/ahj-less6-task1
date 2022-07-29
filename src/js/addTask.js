export default function addTask() {
  const lists = document.querySelector('.list');
  const btn = document.querySelector('.add_btn');
  const addBtn = document.querySelector('.add_item-btn');
  const cancelBtn = document.querySelector('.cancel_item-btn');
  const textarea = document.querySelector('.textarea');
  const form = document.querySelector('.form');

  let value;

  btn.addEventListener('click', () => {
    form.style.display = 'block';
    btn.style.display = 'none';
    addBtn.style.display = 'none';

    textarea.addEventListener('input', (e) => {
      value = e.target.value;

      if (value) {
        addBtn.style.display = 'block';
      } else {
        addBtn.style.display = 'none';
      }
    });
  });

  cancelBtn.addEventListener('click', () => {
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';
  });

  addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const newItem = document.createElement('div');
    newItem.classList.add('list_item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists.appendChild(newItem);

    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'flex';
  });
}

// При наведении на задачу происходит удаление

/*
  function changeTitle() {
    const titles = document.querySelectorAll('.title');
    titles.forEach((title) => {
      title.addEventListener('click', (e) => {
        e.target.textContent = '';
      });
    });
  }

  changeTitle(); */

/*
  // let draggedItem = null;
  function dragndrop() {
    const listItems = document.querySelectorAll('.list_item');

    for (let i = 0; i < listItems.length; i++) {
      const item = listItems[i];

      item.addEventListener('dragstart', () => {
        // draggedItem = item;
        // console.log(draggedItem);
        setTimeout(() => {
          item.style.display = 'none';
        }, 0);
      });

      item.addEventListener('dragend', () => {
        setTimeout(() => {
          item.style.display = 'none';
          // draggedItem = null;
        });
      });
    }
  }
  dragndrop(); */
