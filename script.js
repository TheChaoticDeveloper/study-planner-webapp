const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const sortSelect = document.getElementById("sort");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.priority}`;

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong><br />
        ${task.subject} – <em>Due: ${task.dueDate}</em>
      </div>
      <div class="task-actions">
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

// Add task
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    dueDate: document.getElementById("dueDate").value,
    priority: document.getElementById("priority").value
  };

  tasks.push(task);
  saveTasks();
  sortTasks();
  taskForm.reset();
});

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Sort tasks
function sortTasks() {
  const value = sortSelect.value;

  if (value === "date") {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  } else if (value === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tasks.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  renderTasks();
}

// Listen for sort changes
sortSelect.addEventListener("change", sortTasks);

// Initial render
sortTasks();

