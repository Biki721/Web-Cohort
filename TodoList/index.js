const addButton = document.getElementById("add-todo");
const input = document.getElementById("todo-input");
const ul = document.getElementById("list-items");

function addTodo() {
  if (!input.value.trim()) {
    alert("Please enter a valid task!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
        ${input.value}
        <span>
        <button class="edit">
            ✏️
        </button>
        <button class="cancel">X</button>
        </span>
      `;

  ul.appendChild(li);
  input.value = "";
}

addButton.addEventListener("click", addTodo);

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// cancel eventlistener
function editTodoItem(li) {
  let liTextValue = li.firstChild.textContent.trim();
  li.innerHTML = `
        <input type="text" class="edit-input" value="${liTextValue}">
        <span>
        <button class="save">
            ✔️
        </button>
        <button class="cancel">X</button>
        </span>
      `;
  const editInput = li.querySelector(".edit-input");
  editInput.focus();
  editInput.setSelectionRange(editInput.value.length, editInput.value.length);
}

function saveEditedTask(li) {
  const editedTaskInput = li.querySelector(".edit-input").value.trim();

  if (!editedTaskInput) {
    alert("Task cannot be empty!");
    li.querySelector(".edit-input").focus();
    return;
  }

  li.innerHTML = `
            ${editedTaskInput}
            <span>
            <button class="edit">
                ✏️
            </button>
            <button class="cancel">X</button>
            </span>
      `;
}

ul.addEventListener("click", function (e) {
  const target = e.target;
  if (target.classList.contains("cancel")) {
    target.closest("li").remove();
  } else if (target.classList.contains("edit")) {
    editTodoItem(target.closest("li"));
  } else if (target.classList.contains("save")) {
    saveEditedTask(target.closest("li"));
  }
});
