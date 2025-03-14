import { Link } from 'react-router';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from './sendPostRequest';

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Register a New Account</h2>
            <UsernamePasswordForm />

            <p className="mt-4 text-sm text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
            </p>
        </div>
    );
}