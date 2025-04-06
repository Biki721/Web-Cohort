const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const totalTasks = document.querySelector("#totalTasks");
const completedTasks = document.querySelector("#completedTasks");
let completed = 0;

addButton.addEventListener("click", function () {
  if (!taskInput.value.trim()) {
    alert("Please enter a task to add");
    return;
  }
  if (taskList.firstElementChild.classList.contains("empty-list")) {
    taskList.removeChild(taskList.firstElementChild);
  }

  let li = document.createElement("li");
  li.classList.add("task-item");

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("complete-checkbox");
  li.appendChild(checkBox);

  let taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = taskInput.value;
  li.appendChild(taskText);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");
  li.appendChild(deleteButton);

  taskList.appendChild(li);

  totalTasks.textContent = `Total tasks: ${taskList.children.length}`;

  deleteButton.addEventListener("click", function () {
    if (li.classList.contains("completed")) {
      li.remove();
      completed--;
    } else {
      li.remove();
    }

    if (!taskList.children.length) {
      taskList.innerHTML = `<li class="empty-list">No tasks yet. Add one above!</li>`;
    }
    totalTasks.textContent = `Total tasks: ${taskList.children.length}`;
    completedTasks.textContent = `Completed: ${completed}`;
  });

  checkBox.addEventListener("change", function () {
    if (checkBox.checked) {
      li.classList.add("completed");
      completed++;
    } else {
      li.classList.remove("completed");
      completed--;
    }
    completedTasks.textContent = `Completed: ${completed}`;
  });

  // completedTasks.textContent = `Completed: ${completed}`

  taskInput.value = "";
});
