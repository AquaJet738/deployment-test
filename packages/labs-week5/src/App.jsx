// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { nanoid } from "nanoid";

import Todo from './Todo';
import AddTaskForm from './AddTaskForm';

function App(props) {
    // followed example from the mdn web docs (completing and deleting a task)
    function toggleTaskCompleted(id) {
        const updatedTasks = taskList.map((task) => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
              // use object spread to make a new object
              // whose `completed` prop has been inverted
              return { ...task, completed: !task.completed };
            }
            return task;
          });
          setTaskList(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = taskList.filter((task) => id !== task.id);
        setTaskList(remainingTasks);
    }

    const [taskList, setTaskList] = React.useState(props.tasks); // Might have to import react

    function addTask(name) {
        const newTask = { id: `todo-${nanoid()}`, name, completed: false };
        setTaskList([...taskList, newTask]);
    };

    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
            <div className="flex space-x-4"> {/* Unfortunately comments in JSX have to be done like this */}
                <AddTaskForm onNewTask={addTask}/>
            </div>

            <section>
                <h1 className="text-xl font-bold">To do</h1>
                <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                    {taskList.map((task) => (
                        <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} 
                        toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} />))}
                </ul>
            </section>
            <button onClick={() => setTaskList([])} className="p-1 bg-red-600 text-white">Delete all</button>
        </main>
    );
}

export default App;