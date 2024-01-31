const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");
const boardBlock = document.querySelectorAll(".board_block");

window.addEventListener("click", (e) => {
  if (e.target.dataset.role === "add-task") {
    const boardBlock = e.target.closest(".board_block");
    const form = `<form class="board_card" action="#"><textarea cols="28" rows="10" placeholder="Enter a title for this card..." class="textarea form_task"
      style="height: 56px;" ></textarea>
    <button type="submit" class="btn btn-primary form_add-btn">Add card</button>
    <span class="remove-form">x</span></form>`;

    const boardAddBtn = boardBlock.querySelector(".board_block-add-btn");
    boardAddBtn.classList.add("remove-add-btn");
    boardBlock.insertAdjacentHTML("beforeend", form);

    const boardForm = boardBlock.querySelector(".board_card");
    const formTask = boardBlock.querySelector(".form_task");
    const boardList = boardBlock.querySelector(".board_list");

    boardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formTask.value) {
        const task = `
        <div class="draggables-task" draggable="true">
          <textarea class="textarea board-task">${
            formTask.value.charAt(0).toUpperCase() + formTask.value.slice(1)
          }</textarea>
          <i class="fa-solid fa-pen edit-btn"></i>
        </div>`;
        boardList.insertAdjacentHTML("beforeend", task);
        boardForm.remove();
        boardAddBtn.classList.remove("remove-add-btn");
      }

      const boardTask = boardList.querySelector(".board-task");
      boardTask.addEventListener("input", (e) => {
        boardTask.innerText = e.target.value;
      });

      const draggablesTasks = document.querySelectorAll(".draggables-task");
      draggablesTasks.forEach((draggable) => {
        draggable.addEventListener("dragstart", () => {
          draggable.classList.add("dragging");
        });
        draggable.addEventListener("dragend", () => {
          draggable.classList.remove("dragging");
        });
      });
    });

    const removeformBtn = boardBlock.querySelector(".remove-form");
    removeformBtn.addEventListener("click", () => {
      boardForm.remove();
      boardAddBtn.classList.remove("remove-add-btn");
    });
  }
});

boardBlock.forEach((block) => {
  block.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggableTask = document.querySelector(".dragging");
    block.appendChild(draggableTask);
  });
});
