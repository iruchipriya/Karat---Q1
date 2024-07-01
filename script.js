async function fetchTodos() {
  const response = await fetch('https://dummyjson.com/todos?limit=10&skip=80');
  const data = await response.json();
  return data.todos;
}

function createTodoBlocks(todos) {
  const container = document.getElementById('todo-container');
  const userTodos = {};

  // Group todos by userId
  todos.forEach((todo) => {
    if (!userTodos[todo.userId]) {
      userTodos[todo.userId] = [];
    }
    userTodos[todo.userId].push(todo);
  });

  // Create blocks for each user
  for (const userId in userTodos) {
    const userBlock = document.createElement('div');
    userBlock.className = 'user-block';

    const userTitle = document.createElement('h2');
    userTitle.className = 'user-title';
    userTitle.textContent = `User ID: ${userId}`;
    userBlock.appendChild(userTitle);

    userTodos[userId].forEach((todo) => {
      const todoItem = document.createElement('p');
      todoItem.className = 'todo-item';
      todoItem.textContent = todo.todo;
      userBlock.appendChild(todoItem);
    });

    container.appendChild(userBlock);
  }
}

async function init() {
  const todos = await fetchTodos();
  createTodoBlocks(todos);
}

init();
