import { useActionState } from "react";
import { sendPostRequest } from "./sendPostRequest";

/*
const fakeSendEmail = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
};
*/

const UsernamePasswordForm = (props) => {
    const [result, submitAction, isPending] = useActionState(
        async (previousState, formData) => {
            const name = formData.get("name");
            const password = formData.get("password");
            console.log("Login details:", {name, password});

            if (!name || !password) {
                return {
                    type: "error",
                    message: `Please fill in your name and password.`,
                };
            }

            if (typeof props.onSubmit !== "function") {
                return {
                    type: "error",
                    message: "onSubmit function is missing!",
                };
            }

            const submitResult = await props.onSubmit({name, password});
            return submitResult;
        },
        null   
    );

    let messageStyles;
    if (result !== null) {
        if (result.type === "error") {
            messageStyles = {color: "red"};
        } else {
            messageStyles = {color: "green"};
        }
    }

    return (
        <>
        {result && (
            <p style={messageStyles}>
                {result.message}
            </p>
        )}
        {isPending && <p className="message loading">Loading ...</p>}

        <form action={submitAction}>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
            </div>

            <div>
                <button type="submit" disabled={isPending}>Submit</button>
            </div>
        </form>
        </>
    );
};

export default UsernamePasswordForm;
