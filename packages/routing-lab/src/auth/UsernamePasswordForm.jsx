import { useActionState } from "react";
// import { sendPostRequest } from "./sendPostRequest";


const fakeSendEmail = async () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
};


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
    /*
    if (result !== null) {
        if (result.type === "error") {
            messageStyles = {color: "red"};
        } else {
            messageStyles = {color: "green"};
        }
    };*/

    return (
        <>
        {result && <p style={messageStyles}>{result.message}</p>}
        {isPending && <p className="message loading">Loading ...</p>}

        <form action={submitAction}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
        </>
      );
};

export default UsernamePasswordForm;
