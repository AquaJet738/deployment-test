import React from "react";
import { groceryFetcher } from "./groceryFetcher";

const MDN_URL = "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json";

export function useGroceryFetch(source) {
    const [groceryData, setGroceryData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let isStale = false;
        setGroceryData([]); 
            setIsLoading(true);
        setError(null);
    
        const url = source === "MDN" ? MDN_URL : source;
    
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
    }, [source]);

    return { groceryData, isLoading, error };
}