const todoColumn = document.getElementById("todo");
const inProgressColumn = document.getElementById("in-progress");
const doneColumn = document.getElementById("done");

window.addEventListener("click", addNewTaskHandler);

const taskList = document.querySelectorAll(".list_tasks");
taskList.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    const draggableTask = document.querySelector(".dragging");
    column.appendChild(draggableTask);

    saveTaskData(todoColumn, "todo");
    saveTaskData(inProgressColumn, "in-progress");
    saveTaskData(doneColumn, "done");
  });
});

// Sidebar toggle - START

function sidebarToggle(display, width) {
  document.querySelector(".sidebar_close-form").style.display = display;
  document.getElementById("sidebar_open").style.display = display;
  document.getElementById("board_content").style.width = width;
}

document.getElementById("sidebar_close").addEventListener("click", () => {
  sidebarToggle("block", "100%");
  document.querySelector(".sidebar").classList.add("sidebar_none");
});

document.getElementById("sidebar_open").addEventListener("click", () => {
  sidebarToggle("none", "75%");
  document.querySelector(".sidebar").classList.remove("sidebar_none");
});

// Sidebar toggle - END

function saveTaskData(taskColumn, storageKey) {
  const tasks = Array.from(taskColumn.querySelectorAll(".draggable-task")).map(
    (item) => item.querySelector("textarea").textContent
  );

  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function removeEmptyTasks(taskColumn, storageKey) {
  const draggableTasks = taskColumn.querySelectorAll(
    ".list_tasks .draggable-task"
  );
  draggableTasks.forEach((draggableTask) => {
    const textarea = draggableTask.querySelector(".textarea.task");
    if (textarea && textarea.value.trim() === "") {
      draggableTask.remove();
      saveTaskData(taskColumn, storageKey);
    }
  });
}

function addTaskEventListeners(taskColumn) {
  const storageKey = taskColumn.id;
  const listTasks = taskColumn.querySelector(".list_tasks");

  listTasks.addEventListener("input", (e) => {
    const taskElement = e.target.closest(".task");
    if (taskElement) {
      taskElement.innerText = e.target.value;
      saveTaskData(taskColumn, storageKey);
      removeEmptyTasks(taskColumn, storageKey);
    }
  });

  const draggablesTasks = document.querySelectorAll(".draggable-task");
  draggablesTasks.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
      saveTaskData(taskColumn, storageKey);
    });
  });
}

function addNewTaskHandler(e) {
  if (e.target.dataset.role !== "add-task") return;

  const taskColumn = e.target.closest(".task_column");
  const taskList = taskColumn.querySelector(".list_tasks");
  const addCardButton = taskColumn.querySelector(".task_column-add-btn");
  const taskSaveButton = taskColumn.querySelector(".add-task_card");
  const cancelButton = taskColumn.querySelector(".remove-task_card");

  taskList.insertAdjacentHTML("beforeend", getTaskCardHtml());
  addCardButton.classList.add("remove-add-btn");
  cancelButton.addEventListener("click", removeTaskAddElements);

  taskSaveButton.addEventListener("submit", (e) => {
    e.preventDefault();

    addTaskEventListeners(taskColumn);

    const taskValue = taskColumn.querySelector(".task-value").value.trim();

    if (!taskValue) return;

    taskList.insertAdjacentHTML("beforeend", createTaskText(taskValue));
    taskList.classList.add("height");

    saveTaskData(todoColumn, "todo");
    saveTaskData(inProgressColumn, "in-progress");
    saveTaskData(doneColumn, "done");

    removeTaskAddElements(taskSaveButton, addCardButton);
  });

  function removeTaskAddElements() {
    taskSaveButton.remove();
    addCardButton.classList.remove("remove-add-btn");
  }
}

function getTaskCardHtml() {
  return `
    <form class="add-task_card" action="#">
      <textarea name="text" class="textarea task-value"cols="28" rows="10" placeholder="New task..." style="height: 56px;" ></textarea>
      <button type="submit" class="btn btn-primary add-task_card-btn">Add card</button>
      <span class="remove-task_card">Cancel</span>
    </form>`;
}

function createTaskText(taskValue) {
  return `
    <div class="draggable-task" draggable="true">
      <textarea name="text" class="textarea task">${ taskValue.charAt(0).toUpperCase() + taskValue.slice(1) }</textarea>
    </div>`;
}

function loadTaskData(taskColumn) {
  const data = JSON.parse( localStorage.getItem(taskColumn.id) );
  if (!data) return;

  data.forEach((item) => {
    const taskName = `
      <div class="draggable-task" draggable="true">
        <textarea name="text" class="textarea task">${item}</textarea>
      </div>`;

    taskColumn
      .querySelector(".list_tasks")
      .insertAdjacentHTML("beforeend", taskName);
  });

  addTaskEventListeners(taskColumn);
}

// Load saved data from the local storage.
loadTaskData(todoColumn);
loadTaskData(inProgressColumn);
loadTaskData(doneColumn);