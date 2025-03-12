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

function App() {
    const [userName, setUserName] = React.useState("John Doe");
    const {isLoading, fetchedImages} = useImageFetching("");
    console.log(fetchedImages);
    console.log(isLoading);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route index element={<Homepage userName={userName} />} />
                    <Route path="/account" element={<AccountSettings userName={userName} setUserName={setUserName} />} />
                    <Route path="/images" element={<ImageGallery isLoading={isLoading} fetchedImages={fetchedImages}  />} />
                    <Route path="/images/:imageId" element={<ImageDetails />} />
                    {/*<ImageDetails imageId="0" />*/}
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
