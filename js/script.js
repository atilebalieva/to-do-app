const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");
const listOfTasks = document.querySelectorAll(".list_tasks");

/* Sidebar toggle */
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
/* Sidebar toggle */

function setTaskData(taskColumn, storageKey) {
  let tasks = [];
  let listofTask = taskColumn.querySelectorAll(".draggable-task");
  listofTask.forEach((item) => {
    tasks.push(item.querySelector("textarea").textContent);
  });

  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function addEventListenersToTask(taskColumn, storageKey) {
  function removeTaskIfEmpty() {
    const draggableTasks = taskColumn.querySelectorAll(
      ".list_tasks .draggable-task"
    );
    draggableTasks.forEach((draggableTask) => {
      const textarea = draggableTask.querySelector(".textarea.task");
      if (textarea && textarea.value.trim() === "") {
        draggableTask.remove();
        setTaskData(taskColumn, storageKey);
      }
    });
  }
  const changeTask = taskColumn.querySelectorAll(".list_tasks .task");
  changeTask.forEach((item) => {
    item.addEventListener("input", (e) => {
      item.innerText = e.target.value;
      setTaskData(taskColumn, storageKey);
      removeTaskIfEmpty();
    });
  });

  const draggablesTasks = document.querySelectorAll(".draggable-task");
  draggablesTasks.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
}

function getTaskData(taskColumn, storageKey) {
  const data = JSON.parse(localStorage.getItem(storageKey));
  if (data) {
    data.forEach((item) => {
      const taskName = `
      <div class="draggable-task" draggable="true">
        <textarea class="textarea task">${item}</textarea>
      </div>`;

      taskColumn
        .querySelector(".list_tasks")
        .insertAdjacentHTML("beforeend", taskName);
      addEventListenersToTask(taskColumn, storageKey);
    });
  }
}

window.addEventListener("click", (e) => {
  if (e.target.dataset.role === "add-task") {
    function doNotAddTask() {
      addTaskCard.remove();
      taskColumnAddBtn.classList.remove("remove-add-btn");
    }

    const taskColumn = e.target.closest(".task_column");
    const listOfTasks = taskColumn.querySelector(".list_tasks");
    const storageKey = taskColumn.id;
    const addTaskCardHtml = `<form class="add-task_card" action="#"><textarea class="textarea task-value"cols="28" rows="10" placeholder="Enter a title for this card..."
      style="height: 56px;" ></textarea>
    <button type="submit" class="btn btn-primary add-task_card-btn">Add card</button>
    <span class="remove-task_card">x</span></form>`;

    listOfTasks.insertAdjacentHTML("beforeend", addTaskCardHtml);
    const taskColumnAddBtn = taskColumn.querySelector(".task_column-add-btn");
    taskColumnAddBtn.classList.add("remove-add-btn");

    const addTaskCard = taskColumn.querySelector(".add-task_card");
    const taskValue = taskColumn.querySelector(".task-value");

    const removeTaskCard = taskColumn.querySelector(".remove-task_card");
    removeTaskCard.addEventListener("click", doNotAddTask);

    addTaskCard.addEventListener("submit", (e) => {
      e.preventDefault();
      if (taskValue.value) {
        const taskName = `
        <div class="draggable-task" draggable="true">
          <textarea class="textarea task">${
            taskValue.value.charAt(0).toUpperCase() + taskValue.value.slice(1)
          }</textarea>
        </div>`;

        listOfTasks.insertAdjacentHTML("beforeend", taskName);
        listOfTasks.classList.add("height");
        setTaskData(toDo, "to-do");
        setTaskData(inProgress, "in-progress");
        setTaskData(done, "done");

        doNotAddTask();
      }

      addEventListenersToTask(taskColumn, storageKey);
    });
  }
});

listOfTasks.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggableTask = document.querySelector(".dragging");
    column.appendChild(draggableTask);
    setTaskData(toDo, "to-do");
    setTaskData(inProgress, "in-progress");
    setTaskData(done, "done");
  });
});

getTaskData(toDo, "to-do");
getTaskData(inProgress, "in-progress");
getTaskData(done, "done");
