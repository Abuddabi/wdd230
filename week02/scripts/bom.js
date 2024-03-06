const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', addItem);

input.addEventListener('keydown', (event) => {
  // Check if the Enter key was pressed
  if (event.keyCode !== 13) return;
  addItem();
});

function addItem() {
  if (input.value == '') return;

  const li = document.createElement('li');
  li.textContent = input.value;
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';
  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    input.focus();
  });

  input.value = '';
  input.focus();
}

