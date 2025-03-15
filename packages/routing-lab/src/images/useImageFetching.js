import { useEffect, useState } from "react";

const IMAGES = [
    {
        id: "0",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
        name: "Blue merle herding sheep"
    },
    {
        id: "1",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
        name: "Huskies"
    },
    {
        id: "2",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
        name: "Shiba"
    },
    {
        id: "3",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        name: "Tabby cat"
    },
    {
        id: "4",
        src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
        name: "Chickens"
    }
];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId, authToken, delay=1000) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedImages, setFetchedImages] = useState([]);

    console.log("Auth Token:", authToken);

    useEffect(() => {
        console.log("useEffect triggered with imageId:", imageId, "and authToken:", authToken);

        async function fetchImages() {
            setIsLoading(true);
            try {
                const response = await fetch("/api/images", {
                    headers: {
                        "Authorization": `Bearer ${authToken}`
                    }
                });
                
                console.log("Response status:", response.status);
                console.log("Response headers:", response.headers);

                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }

                const data = await response.json();
                setFetchedImages(data);
            } catch (error) {
                console.error("Error fetching images:", error);
                setFetchedImages([]);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchImages();
        }, delay);

        return () => clearTimeout(timer);
    }, [imageId, authToken, delay]);

    return { isLoading, fetchedImages };
}
