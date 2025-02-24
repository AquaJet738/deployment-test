import React from "react";

// eslint-disable-next-line
function AddTaskForm({ onNewTask }) {
    const [newTask, setTaskName] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");

    const handleAddTask = () => {
        if (newTask.trim()) {
            onNewTask(newTask);
            setTaskName("");
        }
    }; 

    return (
        <div className="flex flex-col space-y-4 w-64"> {/* Unfortunately comments in JSX have to be done like this */}
            <input className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="New task name" 
                value={newTask}
                onChange={(e) => setTaskName(e.target.value)}/>
            <input className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none 
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Due date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}/>
            <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md 
                hover:bg-blue-650 active:bg-blue-800 focus:outline-none focus:ring-2 
                focus:ring-blue-400 focus:ring-opacity-75"
                onClick={handleAddTask}>
                Add task
            </button>
        </div>
    );
}

export default AddTaskForm;