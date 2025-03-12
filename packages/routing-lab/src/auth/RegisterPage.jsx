import { Link } from 'react-router';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from './sendPostRequest';

export default function RegisterPage() {
    const handleOnSubmit = async ({ name, password }) => {
        const response = await sendPostRequest("/auth/register", { name, password });
        
        try {
            if (response.status >= 400 && response.status < 500) {
                return { type: "error", message: "User already exists or invalid input." };
            }
            
            if (response.status >= 500) {
                return { type: "error", message: "Server error, please try again later." };
            }
            
            return response;
        } catch (error) {
            return { type: "error", message: "An unexpected error occurred." };
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Register a New Account</h2>
            <UsernamePasswordForm onSubmit={handleOnSubmit}/>

            <p className="mt-4 text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
            </p>
        </div>
    );
}