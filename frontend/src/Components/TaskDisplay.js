import React, { useState, useEffect } from 'react';
import { EditTaskModal } from './Modals.js';
import { isEditOpen, setIsEditOpen } from '../App.js';
import '../CSS Styles/TaskDisplayStyle.css';
const TaskMapDisplay = ({ tasks, changeCompletion, openEditModal,
    isEditOpen,
    setIsEditOpen,
    selectedTask,
    saveEditedTask,
    handleEditChange,
    deleteFromModal,
    onKeyDown, setSelectedTask }) => {
    const [categories, setCategory] = useState({
        Uncategorized: [],
        Learning: [],
        Gym: [],
    });

  
    function sortTasks() {
        console.log("Sort tasks called")
        setCategory(prevCategories => {
            const newCategories = { ...prevCategories }
            Object.keys(newCategories).forEach(key => newCategories[key] = []);

            tasks.forEach(task => {
                const category = task.category || "Uncategorized" //category is whatever it is, or it will be Uncategorized
                // console.log("Task:" + task.name + " categorized as:" + category)


                if (!newCategories[category]) //Check if category exists and make new category if it doesnt
                    newCategories[category] = [];
                newCategories[category].push(task)
                //console.log("Pushing: \"" + task.name + "\" into " + category);

            })

            return newCategories;
        })

    }
    function TaskComponent({ task, openEditModal, changeCompletion, isEditOpen,
        setIsEditOpen,
        selectedTask,
        saveEditedTask,
        handleEditChange,
        deleteFromModal,
        onKeyDown, }) {
        return (
            <div className="p-2 border rounded">
                <p className ="taskInfo">{task.name}-{task.description}</p>
                <button onClick={() => changeCompletion(task.id, task.completion)} >
                    {task.completion ? "✅" : "❌"}
                </button>
                <button onClick={() => openEditModal(task)}><img src="/editButton.png" alt = "Edit" className="taskEditImage"/></button>

                

            </div>
        );
    }
    useEffect(() => {
        console.log("Task use effect called")
        sortTasks()
    }, [tasks]);

    return (

        //NOTE: It seems to put uncompleted on bottom and completed on top at first,

        <div className = "taskMapDisplayContainer">
            {Object.entries(categories).map(([categoryName, tasks]) => (
                <div key={categoryName} className="mb-4" >
                    <h2 className="text-xl font-bold mb-2">{categoryName}</h2> {/* Category Name */}

                    {tasks.length > 0 ? (
                        tasks.map(task => (

                            <TaskComponent key={task.id} task={task} openEditModal={openEditModal} changeCompletion={changeCompletion} setIsEditOpen={setIsEditOpen} isEditOpen={isEditOpen}
                                selectedTask={selectedTask}
                                saveEditedTask={saveEditedTask}
                                handleEditChange={handleEditChange}
                                deleteFromModal={deleteFromModal}
                                onKeyDown={onKeyDown}></TaskComponent>

                        ))

                    ) : (
                        <p className="text-gray-500">No tasks in this category.</p>
                    )
                    }

                </div>
            ))}
            {isEditOpen && (
                <EditTaskModal isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} selectedTask={selectedTask} setSelectedTask={setSelectedTask} saveEditedTask={saveEditedTask} handleEditChange={handleEditChange} deleteFromModal={deleteFromModal} onKeyDown={onKeyDown} />
            )}

        </div>

        // <ul>

        //     {tasks.map((task) => (

        //         <li key={task.id}>

        //             {task.name} - {task.description} 

        //             <button onClick={() => changeCompletion(task.id, task.completion)}>
        //                 {task.completion ? "✅" : "❌"}
        //             </button>

        //             <button onClick={() => openEditModal(task)}>Edit </button> 
        //         </li>
        //     ))}
        // </ul>

    )
}
export default TaskMapDisplay;