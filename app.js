const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const alert_msg = document.querySelector('.alert_msg');

todoInput.focus();

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', delete_or_complete);

const todoArr = [];
let text;


function addTodo(e) {
    e.preventDefault(); // Prevents the website from reloading when submitting the form

    text = todoInput.value;

    // Blink animation
    function blink() {
        alert_msg.classList.add('blink');
        setTimeout(() => {
            alert_msg.classList.remove('blink');
        }, 1000);
    }


    // Checks if the input field is empty
    if (text.length == 0) {
        alert_msg.innerHTML = 'The field is empty, write something!';
        alert_msg.classList.add('alert_msg_display');
        blink();
        return;
    }

    if (text.length <= 2) {

        alert_msg.innerHTML = 'You must write something with at least 3 characters';
        alert_msg.classList.add('alert_msg_display');
        blink();
        return;
    }

    if (text.length >= 25) {
        alert_msg.innerHTML = 'The text is too long';
        alert_msg.classList.add('alert_msg_display');
        blink();
        return;
    }
    alert_msg.classList.remove('alert_msg_display');
    alert_msg.innerHTML = "";

    // Creates new todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.classList.add('fadein');

    // Creates li (todo item)
    const newTodo = document.createElement('li');
    newTodo.innerText = text;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    // Creates check mark button
    // const completeButton = document.createElement('button');
    // completeButton.innerHTML = '<i class="fas fa-check"></i>';
    // completeButton.classList.add('complete-btn');

    // todoDiv.appendChild(completeButton);

    // Creates trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');

    todoDiv.appendChild(trashButton);

    // Append to the list
    todoList.appendChild(todoDiv);

    // Adds a new todo to the array
    const todoObject = { todo: text, isComplete: false };
    todoArr.push(todoObject);

    // Clears the input field
    todoInput.value = "";
}


function delete_or_complete(e) {
    const item = e.target;

    // Delete Item
    if (item.classList[0] === "trash-btn") {
        // Animation
        const todo = item.parentElement;
        todo.classList.remove('fadein');
        todo.classList.add('fadeout');

        let todoIndex = Array.from(todo.parentElement.children).indexOf(todo); // Gets the index of the todo div
        todoArr.splice(todoIndex, 1); // Deletes the todo from the array

        setTimeout(() => {
            todo.remove(); // Deletes the todo div
            
            // Updates the task complete value
            const completeMsg = document.querySelector('.taskCompleted');
            const completed = document.querySelectorAll(".completed");
            completeMsg.innerHTML = `Tasks completed: ${completed.length}`
        }, 400);
    }

    // Check Mark
    if (/*item.classList[0] === "complete-btn" || */item.classList[0] === "todo-item") {

        const todo = item.parentElement;
        todo.classList.toggle('completed'); // Adds or removes the completed css class

        // Adds true or false depeding on if it's completed or not
        const todoIndex = Array.from(todo.parentElement.children).indexOf(todo); // Gets the index of the todo div
        if (todoArr[todoIndex].isComplete == false) {
            todoArr[todoIndex].isComplete = true
        } else {
            todoArr[todoIndex].isComplete = false
        }

    }

    // Updates the task complete value
    const completeMsg = document.querySelector('.taskCompleted');
    const completed = document.querySelectorAll(".completed");
    completeMsg.innerHTML = `Tasks completed: ${completed.length}`
}
