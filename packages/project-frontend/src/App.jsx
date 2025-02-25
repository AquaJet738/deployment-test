import React from "react";
import { nanoid } from "nanoid";

import AddTaskForm from "./AddTaskForm";
import Todo from "./Todo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DarkModeToggle({ darkMode, setDarkMode }) {
    React.useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.documentElement.style.backgroundColor = "#1a202c";
            document.documentElement.style.color = "#ffffff";
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.style.backgroundColor = "#ffffff";
            document.documentElement.style.color = "#000000";
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-500 text-white rounded fixed right-0">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}

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
        <div className="fixed inset-0 bg-slate-800/55 flex justify-center items-center">
            <div 
                ref={modalRef}
                className="p-6 rounded-lg shadow-lg bg-white text-black dark:bg-slate-700 dark:text-white"
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
    const [taskList, setTaskList] = React.useState(props.tasks);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isSidebarOpen, setSidebarOpen] = React.useState(true);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
    const [darkMode, setDarkMode] = React.useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    React.useEffect(() => {
        const handleResize = () => {
          const mobileView = window.innerWidth < 768;
          setIsMobile(mobileView);
          
          // Ensure sidebar is always visible on larger screens
          if (!mobileView) setSidebarOpen(false);
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
      }, []);

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

    function addTask(name, dueDate, nagPeriod) {
        const newTask = { id: `todo-${nanoid()}`, name, dueDate, nagPeriod, completed: false };
        setTaskList([...taskList, newTask]);
        setIsModalOpen(false);
    };

    return (
        <main className="m-4"> {/* Tailwind: margin level 4 on all sides*/}
            <Navbar darkMode={darkMode}/>
            <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} toggleSidebar={toggleSidebar} darkMode={darkMode}/>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>

            <div className="flex right-0 justify-between items-center">
            </div>
            <section className="mt-5">
                {/*<h1 className="text-xl font-bold">To do</h1>**/}
                <ul role="list" className="todo-list stack-large stack-exception" aria-labelledby="list-heading">
                    {taskList.map((task) => (
                        <Todo id={task.id} 
                        name={task.name} 
                        dueDate={task.dueDate} 
                        nagPeriod={task.nagPeriod} 
                        completed={task.completed} 
                        key={task.id} 
                        toggleTaskCompleted={toggleTaskCompleted} 
                        deleteTask={deleteTask} />))}
                </ul>
            </section>
            <button onClick={() => setIsModalOpen(true)} className="p-1 mr-4 bg-blue-600 text-white">
                Add Task
            </button>

            <button onClick={() => setTaskList([])} className="p-1 mr-4 bg-red-600 text-white">
                Delete all
            </button>
        
            <Modal isOpen={isModalOpen} headerLabel="Create New Task" onCloseRequested={() => setIsModalOpen(false)}>
                <AddTaskForm onNewTask={addTask} />
            </Modal>
        
        </main>
    );
}

export default App;
