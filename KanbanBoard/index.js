const container = document.querySelector(".container");
const addBoard = document.querySelector(".add-board");
const modal = document.querySelector(".modal");
const menu = document.querySelector(".menu");
const addItem = document.querySelectorAll(".add-item");
let isEditing = false;
let currentBoard = null;

function saveBoardsToLocalStorage() {
  const boards = [];
  document.querySelectorAll(".board").forEach((board) => {
    const boardName = board.querySelector("h4 span:nth-child(2)").innerText;
    const boardDescription = board.querySelector(".description").innerText;
    const boardColor = board.querySelector(".circle").style.backgroundColor;
    const items = Array.from(
      board.querySelectorAll(".items .item:not(.add-item)")
    ).map((item) => ({
      task: item.querySelector("span:nth-child(1)").innerText,
      assignedTo: item
        .querySelector(".assigned")
        .innerText.replace("assigned To: ", ""),
      date: item
        .querySelector(".date:nth-child(3)")
        .innerText.replace("created On: ", ""),
      time: item
        .querySelector(".date:nth-child(4)")
        .innerText.replace("created At: ", ""),
    }));
    boards.push({
      boardName,
      boardColor,
      boardDescription,
      items,
    });
  });

  localStorage.setItem("kanbanBoards", JSON.stringify(boards));
}

function loadBoardsFromLocalStorage() {
  const savedBoards = JSON.parse(localStorage.getItem("kanbanBoards")) || [];

  document.querySelectorAll(".board").forEach((board) => board.remove());

  savedBoards.forEach(({ boardName, boardColor, boardDescription, items }) => {
    createBoard(boardName, boardColor, boardDescription);

    const board = [...document.querySelectorAll(".board")].pop();
    const itemsContainer = board.querySelector(".items");
    const addItemElement = itemsContainer.querySelector(".add-item");

    // Maintain the exact order by inserting before the add-item element
    items.forEach((item) => {
      const newItem = createItem(
        item.task,
        item.assignedTo,
        item.date,
        item.time,
        boardName
      );
      newItem.style.borderColor =
        board.querySelector(".circle").style.backgroundColor;
      itemsContainer.insertBefore(newItem, addItemElement);
    });

    updateTotalItems(board);
  });
}

function updateTotalItems(board) {
  const totalItemsElement = board.querySelector("#total-items");
  const itemCount = board.querySelectorAll(".items .item").length; // Count all tasks in the board
  totalItemsElement.textContent = itemCount;
}

function createBoard(boardName, boardColor, description) {
  const board = document.createElement("div");
  board.classList.add("board");
  //   board.style.backgroundColor = boardColor;
  board.setAttribute("draggable", true);
  board.innerHTML = `<h4>
            <span class="circle"></span>  
            <span>${boardName}</span>  
            <span id="total-items">0</span>  
            <span class="menu">⁝</span>
            <span class="edit-board">
            <span class="editing">Edit Board</span>
            <hr />
            <span class="delete">Delete Board</span>
          </span>
          </h4>
        <p class="description">${description}</p>
        <div class="items"> 
          <p class="add-item"><span>+ </span> Add item</p>
        </div>`;
  const circle = board.querySelector(".circle");
  circle.style.backgroundColor = boardColor;
  const container = document.querySelector(".container");
  container.insertBefore(board, addBoard);
  updateTotalItems(board);
}

function updateBoard(board, boardName, boardColor, description) {
  const boardNameElement = board.querySelector("h4 span:nth-child(2)");
  const descriptionElement = board.querySelector(".description");
  const colorElement = board.querySelector(".circle");

  boardNameElement.innerText = boardName;
  descriptionElement.innerText = description;
  colorElement.style.backgroundColor = boardColor;
}

document.addEventListener("DOMContentLoaded", loadBoardsFromLocalStorage);

addBoard.addEventListener("click", () => {
  modal.classList.toggle("show");
});

modal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("cancel")
  ) {
    modal.classList.remove("show");
    isEditing = false;
    currentBoard = null;
  }
  if (e.target.classList.contains("submit")) {
    const boardName = document.querySelector(".board-name");
    const boardColor = document.querySelector(".selected");
    const description = document.querySelector(
      "input[placeholder='Description']"
    );

    if (!boardName.value.trim()) {
      alert("Please enter a board name");
      return;
    }
    if (!boardColor.style.backgroundColor) {
      alert("Please select a color");
      return;
    }
    if (!description.value.trim()) {
      alert("Please enter a description");
      return;
    }
    if (isEditing && currentBoard) {
      // Update existing board
      updateBoard(
        currentBoard,
        boardName.value,
        boardColor.style.backgroundColor,
        description.value
      );
      isEditing = false;
      currentBoard = null;
      saveBoardsToLocalStorage();
    } else {
      createBoard(
        boardName.value,
        boardColor.style.backgroundColor,
        description.value
      );
      saveBoardsToLocalStorage();
    }

    boardName.value = "";
    description.value = "";
    modal.classList.remove("show");
  }
});

document.querySelectorAll(".color").forEach((color) => {
  color.addEventListener("click", () => {
    // Remove selected class from all colors
    document
      .querySelectorAll(".color")
      .forEach((c) => c.classList.remove("selected"));
    // Add selected class to clicked color
    color.classList.add("selected");
  });
});

container.addEventListener("click", (e) => {
  // Handle menu clicks
  if (e.target.classList.contains("menu")) {
    document.querySelectorAll(".edit-board.show").forEach((menu) => {
      if (menu !== e.target.nextElementSibling) {
        menu.classList.remove("show");
      }
    });
    const menu = e.target.nextElementSibling;
    menu.classList.toggle("show");
  }

  // Handle edit clicks
  if (e.target.classList.contains("editing")) {
    isEditing = true;
    currentBoard = e.target.closest(".board");
    const boardName = currentBoard.querySelector("h4 span:nth-child(2)");
    const description = currentBoard.querySelector(".description");
    const color = currentBoard.querySelector(".circle");

    // Open modal with current values
    document.querySelector(".board-name").value = boardName.innerText;
    document.querySelector("input[placeholder='Description']").value =
      description.innerText;

    // Find and select the matching color
    const selectedColor = Array.from(document.querySelectorAll(".color")).find(
      (c) => c.style.backgroundColor === color.style.backgroundColor
    );
    if (selectedColor) {
      document
        .querySelectorAll(".color")
        .forEach((c) => c.classList.remove("selected"));
      selectedColor.classList.add("selected");
    }

    modal.classList.add("show");
  }
  if (e.target.classList.contains("delete")) {
    const boardToDelete = e.target.closest(".board");
    if (boardToDelete) {
      // Optional: Add confirmation before deletion
      if (confirm("Are you sure you want to delete this board?")) {
        boardToDelete.remove();
        saveBoardsToLocalStorage();
      }
    }
  }

  if (e.target.classList.contains("add-item")) {
    currentItemBoard = e.target.closest(".board"); // Get the board where "Add Item" was clicked
    addModal.classList.add("show"); // Show the modal
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("menu")) {
    document.querySelectorAll(".edit-board.show").forEach((board) => {
      board.classList.remove("show");
    });
  }
});

let currentItemBoard = null;
let isEditingItem = false;
const addModal = document.querySelector(".add-modal");
const taskName = document.querySelector(".task-name");
const assignedTo = document.querySelector(".assigned-to");

function createItem(
  taskNameValue,
  assignedToValue,
  dateValue,
  formattedTime,
  boardNameElementValue
) {
  const p = document.createElement("p");
  p.classList.add("item");
  p.setAttribute("draggable", true);
  p.innerHTML = `<span>${taskNameValue}</span>
          <span class="assigned">assigned To: ${assignedToValue}</span>
          <span class="date">created On: ${dateValue}</span>
          <span class="date">created At: ${formattedTime} </span>
          <span class="status">status: ${boardNameElementValue} </span>`;
  return p;
}

function DateCalculation() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${ampm}`;
  const date = `${day}/${month}/${year}`;

  return { date, formattedTime };
}

// Attach event listener once
addModal.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("close") ||
    e.target.classList.contains("cancel")
  ) {
    addModal.classList.remove("show");
    return;
  }

  if (e.target.classList.contains("submit")) {
    if (!taskName.value.trim()) {
      alert("Please enter a task name");
      return;
    }
    if (!assignedTo.value.trim()) {
      alert("Please enter an assigned name");
      return;
    }

    const { date, formattedTime } = DateCalculation();

    if (isEditingItem && currentItemBoard) {
      updateItem(
        currentItemBoard,
        taskName.value,
        assignedTo.value,
        date,
        formattedTime
      );
      saveBoardsToLocalStorage();
      addModal.classList.remove("show");
      isEditingItem = false;
      currentItemBoard = null;
      // Clear input fields
      taskName.value = "";
      assignedTo.value = "";

      addModal.classList.remove("show");
    } else {
      const boardNameElement = currentItemBoard.querySelector(
        "h4 span:nth-child(2)"
      );

      const newItem = createItem(
        taskName.value,
        assignedTo.value,
        date,
        formattedTime,
        boardNameElement.textContent
      );

      const currentItems = currentItemBoard.querySelector(".items");
      newItem.style.borderColor =
        currentItemBoard.querySelector(".circle").style.backgroundColor;
      currentItems.insertBefore(newItem, currentItems.firstChild);
      saveBoardsToLocalStorage();
      updateTotalItems(currentItemBoard);

      // Clear input fields
      taskName.value = "";
      assignedTo.value = "";

      addModal.classList.remove("show");
    }
  }
});

container.addEventListener("dblclick", (e) => {
  const item = e.target.closest(".item"); // Find the nearest .item element
  if (!item) return; // Exit if not an item

  isEditingItem = true;
  currentItemBoard = item; // Store the reference of the clicked item

  // Extract existing values from the item
  const taskValue =
    item.querySelector("span:nth-child(1)")?.textContent.trim() || "";
  const assignedValue =
    item
      .querySelector(".assigned")
      ?.textContent.replace("assigned To: ", "")
      .trim() || "";

  // Set values in the modal inputs
  taskName.value = taskValue;
  assignedTo.value = assignedValue;

  // Show the edit modal
  addModal.classList.add("show");
});

function updateItem(
  currentItem,
  taskValue,
  assignedValue,
  dateValue,
  formattedTime
) {
  const taskNameElement = currentItem.querySelector("span:nth-child(1)");
  const assigned = currentItem.querySelector(".assigned");
  const date = currentItem.querySelector("span:nth-child(3)");
  const time = currentItem.querySelector("span:nth-child(4)");

  if (taskNameElement) taskNameElement.textContent = taskValue;
  if (assigned) assigned.textContent = `assigned To: ${assignedValue}`;
  if (date) date.textContent = `created On: ${dateValue}`;
  if (time) time.textContent = `created At: ${formattedTime}`;
}

const allBoards = document.querySelectorAll(".board");
const allItems = document.querySelectorAll(".item");

let draggedBoard = null;

container.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (draggedBoard) {
    const afterElement = getDragAfterBoard(container, e.clientX);
    const addBoardButton = document.querySelector(".add-board");

    if (afterElement) {
      container.insertBefore(draggedBoard, afterElement);
    } else {
      container.insertBefore(draggedBoard, addBoardButton);
    }
  } else {
    const board = e.target.closest(".board");
    if (!board) return;

    const borderColor = board.querySelector(".circle").style.backgroundColor;
    board.style.borderColor = borderColor;
    board.classList.add("drag-over");
    const itemsContainer = board.querySelector(".items");
    const draggingElement = document.querySelector(".dragging");
    if (!draggingElement || !itemsContainer) return;

    draggingElement.style.borderColor = borderColor;

    const boardName = board.querySelector("h4 span:nth-child(2)");
    const { date, formattedTime } = DateCalculation();

    updateItem(
      draggingElement,
      draggingElement.querySelector("span:nth-child(1)").textContent,
      draggingElement
        .querySelector(".assigned")
        .textContent.replace("assigned To: ", ""),
      date,
      formattedTime
    );

    draggingElement.querySelector(
      ".status"
    ).textContent = `status: ${boardName.textContent}`;

    // Check if board is empty (only contains "Add item" element)
    const addItemElement = itemsContainer.querySelector(".add-item");

    if (itemsContainer.children.length === 1) {
      // If board is empty, insert before "Add item"
      itemsContainer.insertBefore(draggingElement, addItemElement);
    } else {
      // Otherwise use normal positioning logic
      const afterElement = getDragAfterElement(itemsContainer, e.clientY);
      if (afterElement) {
        itemsContainer.insertBefore(draggingElement, afterElement);
      } else {
        itemsContainer.insertBefore(draggingElement, addItemElement);
      }
    }
    updateTotalItems(board);
    saveBoardsToLocalStorage();
  }
});

let sourceBoard = null;

container.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.add("dragging");
    sourceBoard = e.target.closest(".board");
  } else if (e.target.classList.contains("board")) {
    draggedBoard = e.target;
    e.target.classList.add("dragging-board");
    e.target.style.opacity = "0.5";
  }
});

container.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("item")) {
    e.target.classList.remove("dragging");
  } else if (e.target.classList.contains("board")) {
    e.target.classList.remove("dragging-board");
    e.target.style.opacity = "1";
    draggedBoard = null;
    saveBoardsToLocalStorage();
  }
});

container.addEventListener("dragleave", (e) => {
  const board = e.target.closest(".board");
  if (board) {
    board.style.borderColor = "transparent";
    board.classList.remove("drag-over");
  }
});

container.addEventListener("drop", (e) => {
  e.preventDefault();
  const board = e.target.closest(".board");
  if (board) {
    board.style.borderColor = "transparent";
    board.classList.remove("drag-over");
    updateTotalItems(board);

    if (sourceBoard && sourceBoard !== board) {
      updateTotalItems(sourceBoard);
    }
    saveBoardsToLocalStorage();
  }
});

function getDragAfterElement(container, y) {
  const draggableELements = [
    ...container.querySelectorAll(".item:not(.dragging):not(.add-item)"),
  ];
  let closestItem = null;
  let closestOffset = -Infinity; // or Number.NEGATIVE_INFINITY

  for (const child of draggableELements) {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestItem = child;
    }
  }
  return closestItem;
}

function getDragAfterBoard(container, x) {
  const draggableElements = [
    ...container.querySelectorAll(".board:not(.dragging-board)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

const mode = document.querySelector(".mode");

mode.addEventListener("click", () => {
  const body = document.querySelector("body");

  if (mode.textContent === "☀") {
    // Switch to Dark Mode
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "#ffffff";

    // Update boards
    document.querySelectorAll(".board").forEach((board) => {
      board.style.backgroundColor = "#2d2d2d";
      board.style.borderColor = "#404040";
    });

    // Update items
    document.querySelectorAll(".item").forEach((item) => {
      const board = item.closest(".board");
      const boardColor = board.querySelector(".circle").style.backgroundColor;
      item.style.backgroundColor = "#333333";
      item.style.color = "#ffffff";
      item.style.borderColor = boardColor;
    });

    // Update modals
    document
      .querySelectorAll(".modal-content, .add-modal-content")
      .forEach((modal) => {
        modal.style.backgroundColor = "#2d2d2d";
        modal.style.color = "#ffffff";
      });

    // Update inputs
    document.querySelectorAll("input[type='text']").forEach((input) => {
      input.style.backgroundColor = "#333333";
      input.style.color = "#ffffff";
      input.style.borderColor = "#404040";
    });

    document.querySelectorAll(".add-item").forEach((item) => {
      item.style.backgroundColor = "#2d2d2d";
      item.style.color = "#999999";
      item.querySelector("span").style.color = "#999999"; // Update the plus sign color
    });

    // Update add board button
    const addBoard = document.querySelector(".add-board");
    addBoard.style.backgroundColor = "#333333";
    addBoard.style.color = "#ffffff";
    addBoard.style.borderColor = "#404040";

    mode.textContent = "🌙"; // Toggle to Light Mode icon
  } else {
    // Switch to Light Mode
    body.style.backgroundColor = "#faffff";
    body.style.color = "#333333";

    // Update boards
    document.querySelectorAll(".board").forEach((board) => {
      board.style.backgroundColor = "rgba(209, 209, 195, 0.2)";
      board.style.borderColor = "rgb(204, 204, 204, 0.3)";
    });

    // Update items
    document.querySelectorAll(".item").forEach((item) => {
      const board = item.closest(".board");
      const boardColor = board.querySelector(".circle").style.backgroundColor;
      item.style.backgroundColor = "#ffffff";
      item.style.color = "#333333";
      item.style.borderColor = boardColor;
    });

    // Update modals
    document
      .querySelectorAll(".modal-content, .add-modal-content")
      .forEach((modal) => {
        modal.style.backgroundColor = "#fefefe";
        modal.style.color = "#000000";
      });

    // Update inputs
    document.querySelectorAll("input[type='text']").forEach((input) => {
      input.style.backgroundColor = "#ffffff";
      input.style.color = "#333333";
      input.style.borderColor = "#cccccc";
    });

    document.querySelectorAll(".add-item").forEach((item) => {
      item.style.backgroundColor = "transparent";
      item.style.color = "rgb(94, 89, 89, 0.9)";
      item.querySelector("span").style.color = "rgb(94, 89, 89, 0.9)"; // Reset the plus sign color
    });

    // Update add board button
    const addBoard = document.querySelector(".add-board");
    addBoard.style.backgroundColor = "#ffffff";
    addBoard.style.color = "#333333";
    addBoard.style.borderColor = "rgb(204, 204, 204, 0.3)";

    mode.textContent = "☀"; // Toggle to Dark Mode icon
  }
});
