const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', () => {
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
});

