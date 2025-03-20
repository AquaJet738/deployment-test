import { Link } from "react-router";

export function Homepage(props) {
    return (
        <>
            <h1 style={{ paddingTop: "2em" }}>Welcome, {props.userName}.</h1>
            <div>
                <nav style={{ paddingTop: "1em", color: "#0088DC" }}>
                    <Link to="/mylists">Visit your to-do lists</Link>
                </nav>
            </div>
        </>
    );
}
