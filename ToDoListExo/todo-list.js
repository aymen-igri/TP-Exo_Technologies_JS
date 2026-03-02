const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  const reverseToDoList = [...todoList].reverse();

  for (let i = 0; i < reverseToDoList.length; i++) {
    const toDoObj = reverseToDoList[i];
    const html = `
      <div>${toDoObj.name}</div>
      <div>${toDoObj.dueDate}</div>
      <button class="delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  const deleteButtons = document.querySelectorAll('.delete-todo-button');
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
      todoList.splice(i, 1);
      renderTodoList();
    });
  }
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

document.addEventListener('keydown',(e) => {
  if(e.key === 'Enter') {
    addTodo();
  }
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  if(name === '' || dueDate === '') {
    alert('The' + (name === '' ? ' name ' : '') + (name === '' && dueDate === '' ? ' and ' : '') + (dueDate === '' ? ' due date ' : '') + 'cannot be empty');
  }

  todoList.push({
    name,
    dueDate
  });

  inputElement.value = '';
  dateInputElement.value = '';

  renderTodoList();
}