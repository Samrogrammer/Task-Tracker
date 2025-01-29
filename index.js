// Task data will be managed in memory (array of objects)
const tasks = [];

// Function to render tasks on the UI
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.title;

        // Apply strikethrough for completed tasks
        if (task.completed) {
            taskItem.style.textDecoration = 'line-through';
            taskItem.style.color = 'gray';
        }

        // Create a button to toggle completion status
        const toggleButton = document.createElement('button');
        toggleButton.textContent = task.completed ? 'Unmark' : 'Complete';
        toggleButton.onclick = () => {
            task.completed = !task.completed;
            renderTasks();
        };

        // Create a button to delete the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            const index = tasks.indexOf(task);
            if (index > -1) {
                tasks.splice(index, 1);
            }
            renderTasks();
        };

        // Append buttons to the task item
        taskItem.appendChild(toggleButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

    // Move completed tasks to the end of the list
    tasks.sort((a, b) => a.completed - b.completed);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskTitle = taskInput.value.trim();

    if (taskTitle) {
        tasks.push({
            title: taskTitle,
            completed: false,
        });
        taskInput.value = '';
        renderTasks();
    }
}

// HTML and CSS integration for a simple UI
document.body.innerHTML = `
    <div style="font-family: Arial, sans-serif; margin: 20px;">
        <h1>Task Tracker</h1>
        <div>
            <input id="task-input" type="text" placeholder="Enter a new task" style="margin-right: 10px; padding: 5px; width: 200px;"/>
            <button onclick="addTask()" style="padding: 5px;">Add Task</button>
        </div>
        <ul id="task-list" style="margin-top: 20px; list-style: none; padding: 0;"></ul>
    </div>
`;

// Initial rendering of tasks
renderTasks();
