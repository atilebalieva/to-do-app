const toDo = document.getElementById("to-do");
const inProgress = document.getElementById("in-progress");
const done = document.getElementById("done");

window.addEventListener("click", (e) => {
  if (e.target.dataset.role === "add-task") {
    const boardBlock = e.target.closest(".board_block");
    const form = ` <form class="board_card" action="#"><textarea cols="28" rows="10" placeholder="Enter a title for this card..." class="textarea"
      style="height: 56px;" ></textarea>
    <button type="submit" class="btn btn-primary form_add-btn">Add card</button>
    <span class="remove-form">x</span></form>`;

    const boardAddBtn = boardBlock.querySelector(".board_block-add-btn");
    boardAddBtn.classList.add("remove-add-btn");

    boardBlock.insertAdjacentHTML("beforeend", form);

    const boardForm = boardBlock.querySelector(".board_card");
    const textarea = boardBlock.querySelector(".textarea");

    boardForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (textarea.value) {
        const task = `<li class="position-relative">
           <input type="text" value="${
             textarea.value.charAt(0).toUpperCase() + textarea.value.slice(1)
           }">
           <i class="fa-solid fa-pen edit-btn"></i>
          </li>`;
        boardBlock
          .querySelector(".board_list")
          .insertAdjacentHTML("beforeend", task);
        boardForm.remove();
        boardAddBtn.classList.remove("remove-add-btn");
      }
    });

    const removeformBtn = boardBlock.querySelector(".remove-form");
    removeformBtn.addEventListener("click", () => {
      boardForm.remove();
      boardAddBtn.classList.remove("remove-add-btn");
    });
  }
});
