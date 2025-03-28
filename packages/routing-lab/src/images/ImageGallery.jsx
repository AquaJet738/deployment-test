import "./ImageGallery.css";
import { Link } from "react-router";

export function ImageGallery({ isLoading, fetchedImages }) {
    if (isLoading) {
        return <p>Loading...</p>
    }

    const imageElements = fetchedImages.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));

    return (
        <div>
            <h2>Image Gallery</h2>
            <div className="ImageGallery">
                {imageElements}
            </div>
        </div>
    );
}
