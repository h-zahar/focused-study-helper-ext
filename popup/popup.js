const addTaskElem = document.getElementById("btn-task-add");
const tasksElem = document.getElementById("task-list");

let tasks = {
  0: "",
};

const renderTasks = () => {
  console.log(tasks);
  Object.keys(tasks).forEach((task) => {
    const taskElem = document.createElement("div");
    taskElem.id = `task-${task}`;
    taskElem.classList.add("task");
    taskElem.innerHTML = `<input type="text" id="task-name-${task}" value="${tasks[task]}" placeholder="Manifest Your Task!" />
    <button id="btn-task-delete-${task}" class="btn-delete">X</button>`;
    tasksElem.appendChild(taskElem);
  });
};

chrome.storage.sync.get(["tasks"], (data) => {
  if (data.hasOwnProperty("tasks"))
    if (Object.keys(data.tasks).length > 0) tasks = data.tasks;

  renderTasks();
});

const saveTasks = (val) => {
  chrome.storage.sync.set({ tasks: val });
};

const lastTask = () => {
  const taskCount =
    tasksElem.children.length > 0
      ? parseInt(
          tasksElem.children[
            tasksElem.children.length - 1
          ].children[1].id.split("btn-task-delete-")[1]
        ) + 1
      : 0;
  return taskCount;
};

const addTask = () => {
  const taskCount =
    Object.keys(tasks).length > 0 ? Object.keys(tasks).length : 0;
  const taskElem = document.createElement("div");
  taskElem.id = `task-${taskCount}`;
  taskElem.classList.add("task");
  taskElem.innerHTML = `<input type="text" id="task-name-${taskCount}" value="" placeholder="Manifest Your Task" />
    <button id="btn-task-delete-${taskCount}" class="btn-delete">X</button>`;
  tasksElem.appendChild(taskElem);
  tasks[taskCount] = "";
  saveTasks(tasks);
};

addTaskElem.addEventListener("click", () => {
  addTask();
});

tasksElem.addEventListener("change", (e) => {
  if (e.target.id.includes("task-name-")) {
    const taskCount = parseInt(e.target.id.split("task-name-")[1]);
    tasks[taskCount] = e.target.value;
    saveTasks(tasks);
  }
});

tasksElem.addEventListener("click", (e) => {
  const taskCount = lastTask();

  for (let i = 0; i < taskCount; i++) {
    if (parseInt(e.target.id.split("btn-task-delete-")[1]) === i) {
      if (Object.keys(tasks).length === 1) {
        tasks[i] = "";
        tasksElem.textContent = "";

        saveTasks(tasks);
        renderTasks();
      } else {
        e.target.parentElement.remove();
        delete tasks[i];
        saveTasks(tasks);
      }
    }
  }
});
