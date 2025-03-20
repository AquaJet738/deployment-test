import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Todo(props) {
    console.log(props);
    return (
        <div className="flex space-x-8">
            <label className="todo-label flex items-center space-x-4" htmlFor={props.id}>
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/> 
                    <div className="grid grid-cols-3 gap-x-8 w-full">
                        <span className="font-medium">{props.name}</span>
                        <span>Complete by: {props.dueDate || "N/A"}</span>
                        <span>Nag period: {props.nagPeriod || "None"}</span>
                    </div>
            </label>
            <button className="text-gray-500 hover:text-gray-200" onClick={() => props.deleteTask(props.id)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
}
  
export default Todo;