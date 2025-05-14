//NOTES: changeCompletion and saveEditedTask regrabs the whole task array, can be more efficient

import React, { useEffect, useState } from 'react';

import { connectWebSocket, sendTaskUpdate,} from './WebSocketClient';
import './Components/Modals.js';
import './Components/TaskDisplay.js';
import './App.css';
import { AddTaskModal, } from './Components/Modals.js';
import TaskMapDisplay from './Components/TaskDisplay.js';


const App = () => {

  //Task and loading state for when loading tasks in homepage
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState([]);

  const [editField, setEditField] = useState({
    name: '',
    description: '',
    completion: '',
    category: '',
  })
  const [addField, setAddField] = useState({
    name: '',
    description: '',
    completion: '',
    category: '',
  })

  //Use effect so that this only runs once and doesn't infinite loop
  useEffect(() => {
    connectWebSocket();
    setLoading(true)
    grabTasks()


  }, []) // [] is empty dependency array, makes it run only on first render

  useEffect(() => {
    setTimeout(() => { //Allow stomp connection
      if (selectedTask) {
        sendTaskUpdate(selectedTask)
      }
    }, 500)

  }, [selectedTask])

  if (loading)
    return <p> Loading Tasks...</p>


  function grabTasks() {
    // console.log('Grab tasks called')
    fetch("http://localhost:8080/home")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tasks Fetched!", data)
        setTasks(Array.isArray(data) ? data : []);

        setLoading(false);
      }).catch((error) => {
        console.log("Loading Tasks Failed: " + error)
        setLoading(false);
      })
  }

  function changeCompletion(id, currentCompletion) {
    const completionChange = { completion: !currentCompletion };
    console.log("Attempting to change completion of:" + id);
    fetch(`http://localhost:8080/home/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(completionChange),
    })
      .then(() => {
        console.log("Completion change success");
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, completion: !currentCompletion } : task
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //Modal Functions
  function openEditModal(task) {
    console.log("Editing:" + task.name)
    setSelectedTask(task);
    setIsEditOpen(true);

    setEditField({ //So if user clicks on task, saving it with no changes wont erase the task
      name: task.name,
      description: task.description,
      completion: task.completion,
      category: task.category,
    })
  }
  function openAddModal() {
    console.log("Opening Add Modal")
    setIsAddOpen(true)
  }
  function deleteFromModal(task) {
    fetch(`http://localhost:8080/home/${task.id}`, {
      method: "DELETE"
    }).then(res => { return res })
      .then(data => {
        console.log("Success")
        grabTasks()
      })
      
  }


  //Handle textbox changes
  const handleEditChange = (event) => {
    console.log("TEST")
    setEditField({
      ...editField, [event.target.name]: event.target.value
    })
    console.log("Value changed to: " + event.target.value);

    console.log("Edit changes updated")
  }
  const handleAddChange = (event) => {
    setAddField({
      ...addField, [event.target.name]: event.target.value
    })
    console.log("Add changes updated")
  }


  function onKeyDown(e) {
    console.log("Key down");

    if (e.key === "Enter") {
      console.log("Enter key down");

      if (e.target.name === "name" && (isEditOpen || isAddOpen)) {
        document.getElementById("description").focus()

      }
    }
  }
  function saveEditedTask(id, task) {
    const newTask =
    {
      name: editField.name,
      description: editField.description,
      completion: selectedTask.completion, //Keep track of what completion was so it doesnt over write it
      category: editField.category,
    }
   
    console.log("Attempting to update task:" + task.name)
    fetch(`http://localhost:8080/home/${task.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }).then(res => { return res })
      .then(data => {
        console.log("Successfully saved to db")
        setSelectedTask(newTask)
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            
            task.id === id ?  {...task, ...newTask}  : task
          )
        );

      }).catch(error => {
        console.log(error)
      })

    sendTaskUpdate(selectedTask)
  }

  function addTask() {
    console.log("User attempting to add task")
    const newTask = {
      name: addField.name,
      description: addField.description,
      category: addField.category,
    }
    fetch(`http://localhost:8080/home`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }).then(res => { return res })
      .then(data => {
        console.log("Success")
        grabTasks()
      }).catch(error => {
        console.log(error)
      })
      
  }

  //BODY
  return (

    <div className="TaskApp">
      <header className="AppHeader">
        <div className="TaskList">

          <h2> Task List
            <button onClick={() => openAddModal()}> Add Task</button>
            <AddTaskModal isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} addTask={addTask} handleAddChange={handleAddChange} onkeyDown={onKeyDown}></AddTaskModal>
            <TaskMapDisplay
              tasks={tasks}
              changeCompletion={changeCompletion}
              openEditModal={openEditModal}
              isEditOpen={isEditOpen}
              setIsEditOpen={setIsEditOpen}
              setSelectedTask={setSelectedTask}
              selectedTask={selectedTask}
              saveEditedTask={saveEditedTask}
              handleEditChange={handleEditChange}
              deleteFromModal={deleteFromModal}
              onKeyDown={onKeyDown}
            />


          </h2>


        </div>
      </header>

    </div>

  )
}

<a href="https://www.flaticon.com/free-icons/edit" title="edit icons">Edit icons created by Kiranshastry - Flaticon</a>
export default App;