const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");
const listOfTasks = document.querySelectorAll(".list_tasks");

window.addEventListener("click", (e) => {
  if (e.target.dataset.role === "add-task") {
    function doNotAddTask() {
      addTaskCard.remove();
      taskColumnAddBtn.classList.remove("remove-add-btn");
    }

    const taskColumn = e.target.closest(".task_column");
    const listOfTasks = taskColumn.querySelector(".list_tasks");
    const addTaskCardHtml = `<form class="add-task_card" action="#"><textarea class="textarea task-value"cols="28" rows="10" placeholder="Enter a title for this card..."
      style="height: 56px;" ></textarea>
    <button type="submit" class="btn btn-primary add-task_card-btn">Add card</button>
    <span class="remove-task_card">x</span></form>`;

    taskColumn.insertAdjacentHTML("beforeend", addTaskCardHtml);
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
          <i class="fa-solid fa-pen edit-btn"></i>
        </div>`;

        listOfTasks.insertAdjacentHTML("beforeend", taskName);
        listOfTasks.classList.add("height");
        doNotAddTask();
      }

      const changeTask = listOfTasks.querySelector(".task");
      changeTask.addEventListener("input", (e) => {
        changeTask.innerText = e.target.value;
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
    });
  }
});

listOfTasks.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggableTask = document.querySelector(".dragging");
    column.appendChild(draggableTask);
  });
});
