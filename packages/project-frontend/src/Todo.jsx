import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo(props) {
    console.log(props);
    return (
        <div className="flex space-x-8">
            <label className="todo-label" htmlFor={props.id}>
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/> 
                    {props.name} - {props.dueDate || "No due date"} - {props.nagPeriod || "No nag period"}
            </label>
            <button className="text-gray-500 hover:text-gray-200" onClick={() => props.deleteTask(props.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
}
  
export default Todo;