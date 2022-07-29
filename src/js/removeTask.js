export default function removeTask() {
  setInterval(() => {
    const listItems = document.querySelectorAll('.list_item');

    listItems.forEach((item) => {
      item.addEventListener('mouseover', (event) => {
        event.preventDefault();
        const cross = document.createElement('div');
        cross.classList.add('removeItem');
        item.appendChild(cross);
      });
    });

    listItems.forEach((item) => {
      item.addEventListener('mouseout', (event) => {
        event.preventDefault();
        if (item.firstChild) {
          item.removeChild(item.querySelector('.removeItem'));
        }
      });
    });
  }, 1000);
}
