const taskInput = document.getElementById('task');
const form = document.getElementById("task-form");
const filter = document.getElementById("filter");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector(".clear-tasks");

loadAllEventListeners()
function loadAllEventListeners() {
    document.addEventListener("DOMContentLoaded", getTask);

    form.addEventListener("submit", addTask);
    
    taskList.addEventListener("click", deleteItem);

    clearBtn.addEventListener("click", clear)

    filter.addEventListener("keyup", search)

}

function getTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a')
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)
        taskList.appendChild(li);
    })
}


function addTask(e) {
    if(taskInput.value ==="") {
        alert("Add a list Item");
        
    }
    else {
        const li = document.createElement("li");
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a')
        link.className = "delete-item secondary-content";
        link.innerHTML = '<i class="fa fa-remove"></i>'
        li.appendChild(link)
        taskList.appendChild(li);


        addToLocalStorage(taskInput.value);

        taskInput.value = "";
    }
    

    e.preventDefault()
} 


function deleteItem(e) {
    if(e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();
            deleteFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function deleteFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function clear() {
    if(confirm("Are you sure?")) {
        taskList.innerHTML = "";
    }
    localStorage.clear();
}


function search(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task) {
        const taskItem = task.firstChild.textContent;
        if(taskItem.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        }
        else {
            task.style.display = "none";
        }
    })
}
 

function addToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


