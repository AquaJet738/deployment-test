import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";
import { useImageFetching } from "./images/useImageFetching.js";
import RegisterPage from "./auth/RegisterPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import UsernamePasswordForm from "./auth/UsernamePasswordForm.jsx";

function App() {
    const [userName, setUserName] = React.useState("aquajet738");
    const [authToken, setAuthToken] = React.useState();

    const {isLoading, fetchedImages} = useImageFetching("");

    const handleLoginSuccess = (token, userName) => {
        setUserName(userName);
        setAuthToken(token);
        console.log("Current user:", userName)
        console.log("Stored token:", token);
    }
    
    // debugging to check authToken updated
    React.useEffect(() => {
        console.log("Updated auth token:", authToken);
    }, [authToken]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={
                        <ProtectedRoute authToken={authToken}>
                            <Homepage userName={userName} />
                        </ProtectedRoute>}
                    />

                    <Route path="/account" element={
                        <ProtectedRoute authToken={authToken}>
                            <AccountSettings userName={userName} setUserName={setUserName} />
                        </ProtectedRoute>}
                    />

                    <Route path="/images" element={
                        <ProtectedRoute authToken={authToken}>
                            <ImageGallery isLoading={isLoading} fetchedImages={fetchedImages} />
                        </ProtectedRoute>}
                    />
                    
                    <Route path="/images/:imageId" element={
                        <ProtectedRoute authToken={authToken}>
                            <ImageDetails authToken={authToken} />
                        </ProtectedRoute>}
                    />
                    
                    <Route path="/register" element={<RegisterPage onLoginSuccess={handleLoginSuccess}/>} />
                    <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
