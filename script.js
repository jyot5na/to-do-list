const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
const overdueList = document.getElementById("overdueList");

function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = new Date(dueDateInput.value);
    
    if (taskText === "" || isNaN(dueDate)) {
        alert("Please enter a task and due date");
        return;
    }

    const currentTime = new Date();
    const isOverdue = dueDate < currentTime;
    
    const taskItem = document.createElement("li");
    taskItem.classList.add(isOverdue ? "overdue" : "task");
    taskItem.innerHTML = `
        <span>${taskText} ${dueDate.toLocaleString()}</span>
        <button onclick="markComplete(this)">Complete</button>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    if (isOverdue) {
        overdueList.appendChild(taskItem);
    } else {
        taskList.appendChild(taskItem);
    }

    taskInput.value = "";
    dueDateInput.value = "";
}

function markComplete(button) {
    const taskItem = button.parentElement;
    taskItem.classList.add("completed");

    // Move to completed list
    completedList.appendChild(taskItem);

    // Remove the 'Complete' button
    taskItem.removeChild(button);
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
}

// Periodically update overdue tasks
setInterval(() => {
    const currentTime = new Date();

    // Move any overdue tasks from the main list to the overdue list
    const tasks = taskList.querySelectorAll(".task");
    tasks.forEach(task => {
        const dueDateText = task.querySelector("span").textContent.split(" ").slice(-2).join(" ");
        const dueDate = new Date(dueDateText);

        if (dueDate < currentTime) {
            task.classList.add("overdue");
            overdueList.appendChild(task);
        }
    });
}, 60000); // Check every minute