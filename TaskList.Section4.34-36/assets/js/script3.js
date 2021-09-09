// ** TASK LIST ** //
// -- Part One -- //
// == We create and save new tasks using event listeners
// ('click', 'submit', 'keyup'), DOM manipulation,
// if statements, appendChild, parentElement, toLowerCase,
// indexOf, e.target, e.target.value, remove, etc

// link detailing removing text
// https.//jsperf.com/innerHTML-vs-removeChild


// Define our UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
};

// GET TASKS FROM LOCALSTORAGE //////////////////////////////
function getTasks() {
    let tasks;
    // Check localStorage to see if any tasks are in there
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create DOM Element
        // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';

    // Add icon HTML
    link.innerHTML = '<i class="material-icons">remove</i>';
    // Append the link to li
    li.appendChild(link);

    // Append link to ul
    taskList.appendChild(li);
    console.log(li);
    })
};


// ADD TASK /////////////////////////////////////////////////
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';

    // Add icon HTML
    link.innerHTML = '<i class="material-icons">remove</i>';
    // Append the link to li
    li.appendChild(link);

    // Append link to ul
    taskList.appendChild(li);
    console.log(li);

    // Store in localStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input // An empty string removes existing text
    // and leaves the area blank
    taskInput.value = '';

    e.preventDefault();

};

// STORE TASK ///////////////////////////////////////////////
function storeTaskInLocalStorage(task) {
    let tasks;
    // Check localStorage to see if any tasks are in there
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
// Remember that localStorage can only save strings
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK //////////////////////////////////////////////
function removeTask(e) {
    // grab anchor (link) element
    if (e.target.parentElement.classList.contains
        ('delete-item')) {
            console.log(e.target.parentElement);
        if (confirm('Are you sure you want to delete task?')) {
            // delete li element
            console.log(e.target.parentElement.parentElement);
            e.target.parentElement.parentElement.remove()

            // Remove from localStorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
};

// Remove from localStorage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    // Check localStorage to see if any tasks are in there
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));

};

// CLEAR TASK FUNCTION //////////////////////////////////////
function clearTasks() {
    // taskList.innerHTML = '';

    // Faster Way **
    // do... while loop
    // while there is still a first li element in the list..
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    };
    // Clear from localStorage
    clearTasksFromLocalStorage();

};

function clearTasksFromLocalStorage() {
    localStorage.clear()
}

// FILTER THROUGH TASKS /////////////////////////////////////
    // If the list were to become long, this function gives
    // the user the ability to find certain tasks by typing
    // them in the Tasks bar. This function uses the keyup
    // event Listener as well as this function (which makes
    // the input match saved input by using querySelectorAll
    // as well as toLowerCase) to recognize and match data
function filterTasks(e) {
    // e.target.value gives us whatever is being typed in
    const text = e.target.value.toLowerCase();
    console.log(text);

    // NOTE: querySelector returns nodeList, which means we
    // are able to use something like forEach() method.
    // If you come across an HTMLcollection, you must first
    // convert that into an array in order to use a method
    // like forEach()
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text != -1)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
};





