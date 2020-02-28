console.log("app.js is connected to index.html and running...");

//Define the variables for the UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all the event listeners
loadEventListeners();
function loadEventListeners()
{
  document.addEventListener('DOMContentLoaded', getTasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearAllTasks);
  filter.addEventListener('keyup', filterTasks);
}

//retrieves tasks from local storage for local persitence.
function getTasks()
{
  var tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task) );

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);
    taskList.appendChild(li);
  });

}

function addTask(event)
{
  if(taskInput.value === "")
  {
    alert('add a task!');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value) );

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);
  taskList.appendChild(li);

  storeInLocalStorage(taskInput.value);


  taskInput.value = '';

  event.preventDefault();
}

function storeInLocalStorage(task)
{
  var tasks;
  if(localStorage.getItem(tasks) === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(event)
{
  if(event.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm('Are you sure you want to delete this task?'))
    {
      event.target.parentElement.parentElement.remove(); //the grandparent element of the delete button is the li element,
      //remove from local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem)
{
  var tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = [];
  }
  else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index)
  {
    if(taskItem.textContent === task)
    {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearAllTasks()
{
  if(confirm('Delete ALL tasks on the list? (WARNING! CANNOT BE UNDONE!) ') )
  {
    while(taskList.firstChild) //while there is still an item in the list
    {
      taskList.removeChild(taskList.firstChild);
    }
  }

  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage()
{
  localStorage.clear();
}

function filterTasks(event)
{
  const input = event.target.value.toLowerCase();

  //querySelectorAll returns a nodelist where forEach is defined.
  document.querySelectorAll('.collection-item').forEach(function(task)
  {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(input) != -1 )
    {
      task.style.display = 'block';
    }
    else
    {
      task.style.display = 'none;'
    }
  });
}
