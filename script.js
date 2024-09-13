const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksList = document.getElementById('tasks');
const filterButtons = document.querySelectorAll('.filter button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        if (filter === 'completed' && !task.completed) return;
        if (filter === 'incomplete' && task.completed) return;

        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.text}
            <div>
                <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, completed: false });
    taskInput.value = '';
    updateTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTasks();
}

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        renderTasks(btn.id);
    });
});

// Initial rendering of tasks
renderTasks();
