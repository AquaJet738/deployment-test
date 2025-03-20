import { Header } from "./Header.jsx";
import { Outlet } from "react-router";

export function MainLayout() {
    console.log("establishing MainLayout");

    return (
        <div>
            <Header />
            <div style={{padding: "0 2em"}}>
                <Outlet />
            </div>
        </div>
    );
}
