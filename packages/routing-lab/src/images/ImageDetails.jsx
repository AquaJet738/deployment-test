import { useImageFetching } from "./useImageFetching.js";
import { useParams } from "react-router";

export function ImageDetails() {
    const { imageId } = useParams();
    const { isLoading, fetchedImages } = useImageFetching(imageId, 500);
    if (isLoading) {
        return <>Loading...</>;
    }

    console.log(fetchedImages);
    console.log(imageId);
    const imageData = fetchedImages.find(image => image._id === imageId);
    if (!imageData) {
        return <><h2>Image not found</h2></>;
    }

    return (
        <>
            <h2>{imageData.name}</h2>
            <img className="ImageDetails-img" src={imageData.src} alt={imageData.name} />
        </>
    )
}
