import { Link, useNavigate } from 'react-router';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from './sendPostRequest';

export default function RegisterPage({ onLoginSuccess }) {
    const navigate = useNavigate();

    const handleRegister = async ({ username, password }) => {
        try {
            console.log("Registering user:", username, password);

            const response = await sendPostRequest("/auth/register", { username, password });

            if (response && response.token) {
                console.log("Registration successful, received token:", response.token);

                const tokenData = response.token;
                console.log(tokenData);

                onLoginSuccess(tokenData);

                navigate("/"); // Redirect to home page
            } else {
                return { error: response.error || "Registration failed." };
            }
        } catch (error) {
            return { error: "Network error" };
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Register a New Account</h2>
            <UsernamePasswordForm onSubmit={handleRegister}/>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
            </p>
        </div>
    );
}