const addTaskElem = document.getElementById("btn-task-add");
const tasksElem = document.getElementById("task-list");

addTaskElem.addEventListener("click", () => {
  const taskCount =
    tasksElem.children.length > 0
      ? parseInt(
          tasksElem.children[
            tasksElem.children.length - 1
          ].children[1].id.split("btn-task-delete-")[1]
        ) + 1
      : 0;
  // console.log(    tasksElem.children.length > 0
  //   ? [tasksElem.children.length - 1].children[1].id.split(
  //       "btn-task-delete-"
  //     )[1] + 1
  //   : 0);
  const taskElem = document.createElement("div");
  taskElem.id = `task-${taskCount}`;
  taskElem.classList.add("task");
  taskElem.innerHTML = `<input type="text" id="task-name-${taskCount}" placeholder="Manifest Your Task" />
    <button id="btn-task-delete-${taskCount}" class="btn-delete">X</button>`;
  tasksElem.appendChild(taskElem);
});

tasksElem.addEventListener("click", (e) => {
  const taskCount =
    tasksElem.children.length > 0
      ? parseInt(
          tasksElem.children[
            tasksElem.children.length - 1
          ].children[1].id.split("btn-task-delete-")[1]
        ) + 1
      : 0;
  for (let i = 0; i < taskCount; i++) {
    // console.log(parseInt(e.target.className.split("btn-task-delete-")[1]), i);
    if (parseInt(e.target.id.split("btn-task-delete-")[1]) === i) {
      e.target.parentElement.remove();
    }
  }
});
