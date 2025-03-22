export async function sendPatchRequest(url, payload, authToken) {
    console.log(url);
    console.log(payload);

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        if (response.status === 204) {
            return { success: true };
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending PATCH request:", error);
        return { type: "error", message: error.message };
    }
}