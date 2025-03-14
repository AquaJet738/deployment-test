import { ImageEditForm } from "./images/ImageEditForm";

export function Homepage(props) {
    return (
        <>
            <h2>Welcome, {props.userName}</h2>
            <p>This is the content of the home page.</p>

            <h3>Image Editor</h3>
            <ImageEditForm />
        </>
    );
}
