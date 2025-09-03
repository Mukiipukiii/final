document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const taskList = document.getElementById("taskList");

  // Load tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTask(task));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (text === "") return;

    const task = { text, priority, completed: false };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task);
    form.reset();
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.className = task.priority;
    if (task.completed) li.classList.add("completed");

    li.textContent = task.text;

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      taskList.removeChild(li);
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
});
