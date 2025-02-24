import React from "react";
import { nanoid } from "nanoid";

import AddTaskForm from "./AddTaskForm";
import Todo from "./Todo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


function Modal(props) {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
      const handleOutsideClick = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
              props.onCloseRequested();
          }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
      };
  }, [props]);

  if (!props.isOpen) {
      return null;
  }

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div 
              ref={modalRef} // Attach the ref to the inner modal div
              className="bg-white p-6 rounded-lg shadow-lg"
          >
              <div className="modal-header flex justify-between items-center font-bold text-lg">
                  <span>{props.headerLabel}</span>
                  <button 
                      aria-label="Close" 
                      className="text-xl font-bold" 
                      onClick={props.onCloseRequested}
                  >
                      &times;
                  </button>
              </div>
              {props.children}
          </div>
      </div>
  );
}

function App(props) {
  const [taskList, setTaskList] = React.useState(props.tasks); // Might have to import react
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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

  function addTask(name) {
      const newTask = { id: `todo-${nanoid()}`, name, completed: false };
      setTaskList([...taskList, newTask]);
      setIsModalOpen(false);
  };

  return (
      <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
          <Navbar />
          <Sidebar />
          <section>
              <h1 className="text-xl font-bold">To do</h1>
              <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                  {taskList.map((task) => (
                      <Todo id={task.id} name={task.name} completed={task.completed} key={task.id} 
                      toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} />))}
              </ul>
          </section>
          <button onClick={() => setIsModalOpen(true)} className="p-1 mr-4 bg-blue-600 text-white">
              Add Task
          </button>

          <button onClick={() => setTaskList([])} className="p-1 mr-4 bg-red-600 text-white">
              Delete all
          </button>
      
          <Modal isOpen={isModalOpen} headerLabel="Add New Task" onCloseRequested={() => setIsModalOpen(false)}>
              <AddTaskForm onNewTask={addTask} />
          </Modal>
      
      </main>
  );
}

export default App;
