import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import ListInterface from "./todolist/ListInterface";
import { MainLayout } from "./MainLayout.jsx";
import { Homepage } from "./Homepage.jsx";
import { Account } from "./Account.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

function App(props) {
    const [userName, setUserName] = React.useState("aquajet738");
    const [authToken, setAuthToken] = React.useState();

    const handleLoginSuccess = (token, userName) => {
        setUserName(userName)
        setAuthToken(token);
        console.log("Current user:", userName);
        console.log("Stored token:", token);
    }

    const tasks = props.tasks;
    const lists = props.lists;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<Homepage userName={userName} />} />
                    <Route path="/mylists" element={<ListInterface userName={userName} tasks={tasks} lists={lists} />} />
                    <Route path="/profile" element={<Account userName={userName} setUserName={setUserName} />} />
                    <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/register" element={<RegisterPage onLoginSuccess={handleLoginSuccess} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
