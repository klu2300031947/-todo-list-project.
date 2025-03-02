document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn" onclick="removeTask(this)">X</button>
    `;

    li.addEventListener("click", function() {
        this.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    let taskList = document.getElementById("taskList");
    taskList.removeChild(button.parentElement);
    saveTasks();
}

function clearAllTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}

function filterTasks() {
    let tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        if (!task.classList.contains("completed")) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.textContent.replace("X", "").trim(),
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="removeTask(this)">X</button>
        `;
        if (task.completed) {
            li.classList.add("completed");
        }
        li.addEventListener("click", function() {
            this.classList.toggle("completed");
            saveTasks();
        });
        taskList.appendChild(li);
    });
}
