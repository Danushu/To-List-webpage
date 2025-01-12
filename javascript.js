// Task Array to Hold All Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save Tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Tasks to the UI
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button>
            <button onclick="toggleTask(${index})"><i class="fas fa-check"></i></button>
        `;
        taskList.appendChild(li);
    });
}

// Add New Task
document.getElementById("addTaskButton").addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = "";
    }
});

// Toggle Task Completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Initial Render
renderTasks();
