import { useActionState } from "react";
// import { sendPostRequest } from "./sendPostRequest";

const UsernamePasswordForm = (props) => {
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const username = formData.get("username");
            const password = formData.get("password");
        
            if (!username || !password) {
                return {
                    type: "error",
                    message: `Please fill in your username and password.`,
                };
            }
        
            const submitResult = await props.onSubmit({ username, password });
            return submitResult;
        },
        null
    );

    let messageStyles = {color: "green"};

    return (
        <div className="space-y-4">
            {result && (
                <p className={`text-sm ${result.type === "error" ? "text-red-500" : "text-green-500"}`}>
                    {result.message}
                </p>
            )}
            {isPending && <p className="text-blue-500 text-sm">Loading...</p>}

            <form action={submitAction} className="flex flex-col space-y-3">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UsernamePasswordForm;
