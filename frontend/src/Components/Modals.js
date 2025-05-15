import React from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import ReactDOM from 'react-dom'
import '../CSS Styles/ModalStyles.css';

const EditTaskModal = ({ isEditOpen, setIsEditOpen, selectedTask, setSelectedTask, saveEditedTask, handleEditChange, deleteFromModal, onKeyDown }) => {
    function categoryClick(event){ //Display the category change in Category edit changer
        console.log("Category Clicked");
        setSelectedTask((prevTask) => ({
            ...prevTask,
            category: event.target.value,
        }));
    }
    return ReactDOM.createPortal(                      
        <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-500 bg-opacity-50">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-md overflow-y-auto">
                    <DialogTitle className="font-bold">Editing {selectedTask.name}</DialogTitle>
                    <p>Modify the task details below:</p>
                    <div className="editHead">
                        <p>Name</p> <p>Description</p> <p>Category</p>
                    </div>
                    <input type="text" name="name" defaultValue={selectedTask.name} onKeyDown={onKeyDown} onChange={handleEditChange} placeholder="Task Name" className="border p-2 w-full" />
                    <input type="text" name="description" defaultValue={selectedTask.description} onKeyDown={onKeyDown} onChange={handleEditChange} placeholder="Description" className="border p-2 w-full" />
                    {/* <input type="text" name="category" defaultValue={selectedTask.category} onKeyDown={onKeyDown} onChange={handleEditChange} placeholder="Category" className="border p-2 w-full" /> */}


                    <label htmlFor="category"></label>
                    <select name="category" defaultValue={selectedTask.category} onKeyDown={onKeyDown} onChange={(event) => {handleEditChange(event); categoryClick(event);}} className="border p-2 w-full">
                        <option value="Gym" >Gym</option>
                        <option value="Uncategorized" >Uncategorized</option>
                        <option value="Learning" >Learning</option>
                    </select>


                    <div className="flex justify-end gap-4">
                        <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                        <button onClick={() => { setIsEditOpen(false); saveEditedTask(selectedTask.id, selectedTask) }} className="px-4 py-2 bg-blue-500 ">Save</button>
                        <button onClick={() => {deleteFromModal(selectedTask); setIsEditOpen(false)}} className="px-4 py-2 bg-blue-500 ">Delete</button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>,
        document.body
    )

}
const AddTaskModal = ({ isAddOpen, setIsAddOpen, addTask, handleAddChange, onKeyDown, categoryClick, handleCloseAddModal }) => {
    
   
    return (
        <Dialog open={isAddOpen} onClose={() => handleCloseAddModal()} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-500 bg-opacity-50">
            <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-md">
            <DialogTitle className="font-bold">Adding Task</DialogTitle>
                    <p>Add the task details below:</p>
                    <div className="addHead">
                        <p>Name</p> <p>Description</p>
                    </div>
                    <input type="text" name="name" onChange={handleAddChange} onKeyDown={onKeyDown} placeholder="Task Name" className="border p-2 w-full" />
                    <input type="text" name="description" onChange={handleAddChange} onKeyDown={onKeyDown} placeholder="Description" className="border p-2 w-full" />
                    {/* <input type="text" name="category" onChange={handleAddChange} onKeyDown={onKeyDown} placeholder="Category" className="border p-2 w-full" /> */}

                    <select name="category" defaultValue ="Uncategorizrd" onKeyDown={onKeyDown} onChange={(event) => {handleAddChange(event)}} className="border p-2 w-full">
                        <option value="Uncategorized" >Uncategorized</option>
                        <option value="Gym" >Gym</option>
                        <option value="Learning" >Learning</option>
                    </select>
                    <div className="flex justify-end gap-4">
                        <button onClick={() => handleCloseAddModal()} className="px-4 py-2 border rounded">Cancel</button>
                        <button onClick={() => { setIsAddOpen(false); addTask() }} className="px-4 py-2 bg-blue-500 ">Add</button>

                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )

}
export { AddTaskModal, EditTaskModal };