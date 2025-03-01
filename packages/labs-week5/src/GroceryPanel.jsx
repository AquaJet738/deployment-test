import React from "react";
import { Spinner } from "./Spinner";
import { groceryFetcher } from "./groceryFetcher";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */

export function GroceryPanel(props) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [selectedSource, setselectedSource] = React.useState("MDN");

    React.useEffect(() => {
        let isStale = false;
        setGroceryData([]); 
        setIsLoading(true);
        setError(null);

        const url = selectedSource === "MDN" ? MDN_URL : selectedSource;

        async function fetchData() {
            try {
                const data = url === MDN_URL ? await (await fetch(url)).json() : await groceryFetcher.fetch(url);
                if (!isStale) setGroceryData(data);
            } catch (err) {
                if (!isStale) setError(err.message);
            } finally {
                if (!isStale) setIsLoading(false);
            }
        }

        if (url) fetchData();

        return () => {
            isStale = true;
        };
    }, [selectedSource]);

    function handleAddTodoClicked(item) {
        const todoName = `Buy ${item.name} (${item.price.toFixed(2)})`;
        props.onAddTask(todoName);
    }

    function handleDropdownChange(event) {
        setselectedSource(event.target.value);
    }

    return (
        <div>
            <h1 className="text-xl font-bold">Groceries prices today</h1>
            <label className="mb-4 flex gap-4">
                Get prices from:
                <select value={selectedSource}
                    className="border border-gray-300 p-1 rounded-sm disabled:opacity-50" 
                    onChange={handleDropdownChange}>
                    <option value="">(None selected)</option>
                    <option value="MDN">MDN</option>
                    <option value="Liquor store">Liquor store</option>
                    <option value="Butcher">Butcher</option>
                    <option value="whoknows">Who knows?</option>
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
