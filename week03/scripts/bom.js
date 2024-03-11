const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');
const chaptersLSKey = 'myFavBOMList';

const chaptersArray = getChapterList() || [];

chaptersArray.forEach(chapter => displayList(chapter));

button.addEventListener('click', addChapter);

input.addEventListener('keydown', (event) => {
  // Check if the Enter key was pressed
  if (event.keyCode === 13) {
    addChapter();
  }
});

function addChapter() {
  if (input.value !== '') {
    displayList(input.value);
    chaptersArray.push(input.value);
    setChapterList();

    input.value = '';
    input.focus();
  }
}

function getChapterList() {
  return JSON.parse(localStorage.getItem(chaptersLSKey));
}

function setChapterList() {
  localStorage.setItem(chaptersLSKey, JSON.stringify(chaptersArray));
}

function deleteChapter(chapter) {
  chapter = chapter.slice(0, chapter.length - 1);
  chaptersArray = chaptersArray.filter((item) => item !== chapter);
  setChapterList();
}

function displayList(item) {
  const li = document.createElement('li');
  li.textContent = item;
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete');
  deleteButton.textContent = '❌';
  deleteButton.setAttribute("aria-label", `Delete ${item}`);
  li.append(deleteButton);
  list.append(li);

  deleteButton.addEventListener('click', function () {
    list.removeChild(li);
    console.log(li);
    deleteChapter(li.textContent);
    input.focus();
  });
}
