// ** TASK LIST ** //
// -- Part One -- //
// == We create and save new tasks using event listeners, DOM
// manipulation, if statements, appendChild


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

// Add task event
form.addEventListener('submit', addTask);
}

// Add task
function addTask(e) {
    
    if(taskInput.value === '') {
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
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    console.log(li);

    // Clear input
    taskInput.value = '';

    e.preventDefault();
};

// Clear btn event 
// clearBtn.addEventListener('click', function(e) {
   
// });