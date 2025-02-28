import { useImageFetching } from "./useImageFetching.js";

export function ImageDetails(props) {
    const { isLoading, fetchedImages } = useImageFetching(props.imageId, 500);
    if (isLoading) {
        return <>Loading...</>;
    }
    const imageData = fetchedImages[0];
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
