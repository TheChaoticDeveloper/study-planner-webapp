const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks to screen
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.priority}`;

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong><br />
        ${task.subject} – Due: ${task.dueDate}
      </div>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add new task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskForm.reset();
});

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial render
renderTasks();
