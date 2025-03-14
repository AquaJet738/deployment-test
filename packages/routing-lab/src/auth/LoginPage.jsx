import { Link } from 'react-router';
import UsernamePasswordForm from './UsernamePasswordForm';
import { sendPostRequest } from './sendPostRequest';

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Log In</h2>
            <UsernamePasswordForm />

            <p className="mt-4 text-sm text-gray-600">
                Don&apos;t have an account? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
            </p>
        </div>
    );
}