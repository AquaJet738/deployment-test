import React from "react";

import "./Header.css";
import Navbar from "./todolist/Navbar";
import { DarkModeToggle } from "./todolist/ListInterface";

export function Header() {
    const [darkMode, setDarkMode] = React.useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    return (
        <main>
            <Navbar darkMode={darkMode}/>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
        </main>
    );
}
