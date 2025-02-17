import React from "react";
import { Spinner } from "./Spinner";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(url, setGroceryData, setIsLoading, setError) {
    setIsLoading(true);
    setError(null);
    try {
        await delayMs(2000);
        if (!url) {
            setGroceryData([]);
            return;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setGroceryData(data);
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
}

export function GroceryPanel(props) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.onAddTask(todoName);
    }

    function handleDropdownChange(event) {
        const selectedUrl = event.target.value;
        setGroceryData([]);
        if (selectedUrl) {
            fetchData(selectedUrl, setGroceryData, setIsLoading, setError);
        }
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select 
                    className="border border-gray-300 p-1 rounded-sm disabled:opacity-50" 
                    disabled={isLoading} 
                    onChange={handleDropdownChange}>
                    <option value="">(None selected)</option>
                    <option value={MDN_URL}>MDN</option>
                    <option value="invalid">Who knows?</option>
                </select>
                {isLoading && <Spinner></Spinner>}
                {error && <span className="text-red-500">{error}</span>}
            </label>

            {
                groceryData.length > 0 ?
                    <PriceTable items={groceryData} onAddClicked={handleAddTodoClicked} /> :
                    "No data"
            }
        </div>
    );
}

function PriceTable(props) {
    return (
        <table className="mt-4">
            <thead>
            <tr>
                <th className="text-left">Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map(item =>
                    <PriceTableRow
                        key={item.name}
                        item={item}
                        onAddClicked={() => props.onAddClicked(item)}
                    />
                )
            }
            </tbody>
        </table>
    );
}

function PriceTableRow({item, onAddClicked}) {
    const buttonClasses = `italic px-2 rounded-sm border border-gray-300
        hover:bg-gray-100 active:bg-gray-200 cursor-pointer`;
    return (
        <tr>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <button className={buttonClasses} onClick={onAddClicked}>
                    Add to todos
                </button>
            </td>
        </tr>
    );
}
