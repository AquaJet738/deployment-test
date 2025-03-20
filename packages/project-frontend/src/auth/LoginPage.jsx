import React from 'react';
import { Link, useNavigate } from 'react-router';

import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from './sendPostRequest';

export default function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();

    const handleLogin = async ({ username, password }) => {
        try {
            console.log("User login data:", username, password);
            const response = await sendPostRequest("/auth/login", { username, password });

            if (response && response.token) {
                console.log("Can send to app.jsx");
                const tokenData = response.token;
                console.log(tokenData);

                onLoginSuccess(tokenData, username);

                navigate("/");
            } else {
                return { error: response.error || "Login failed." };
            }

        } catch (error) {
            return { error: "Network error" };
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
    
            <UsernamePasswordForm onSubmit={handleLogin} />
    
            <p className="mt-4 text-sm text-center text-gray-600">
                Don&apos;t have an account? 
                <Link to="/register" className="text-blue-500 hover:underline ml-1">
                    Register here
                </Link>
            </p>
        </div>
    );    
}