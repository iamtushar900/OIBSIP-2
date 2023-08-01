const inputField = document.querySelector(".input-field input");
const todoLists = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");

function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  pendingNum.textContent = tasks.length === 0 ? "0" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

//adding task to list
function addtask() {
  if (inputField.value === '') {
    alert("Field can't be empty.");
  }
  else {
    let liTag = ` <li class="list pending"  onclick="handleStatus(this)>
          <span class="task">${inputField.value}</span>
          <i class="ri-close-line" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag); //inserting li tag inside the todolist div
    inputField.value = ""; //removing value from input field
    allTasks();
  }
  saveData();
}

todoLists.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    e.target.classList.toggle("pending");
  }
  allTasks();
  saveData();

}, false);

//deleting task while we click on the delete icon.
function deleteTask(e) {
  e.parentElement.remove(); //getting parent element and remove it
  allTasks();
  saveData();
}

//deleting all the tasks while we click on the clear button.
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
  saveData();
});

function saveData() {
  localStorage.setItem("data", todoLists.innerHTML);
}
function showTask() {
  todoLists.innerHTML = localStorage.getItem("data");
}
showTask();