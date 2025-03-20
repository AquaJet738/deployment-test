import { useState } from "react";
import { Link } from "react-router";

export function Account(props) {
    const [accounts, setAccounts] = useState([props.userName]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <h1 style={{ paddingTop: "2em", fontWeight: "bold" }}>Account settings</h1>
            
            <div style={{ display: "flex", flexDirection: "column", width: "300px", marginTop: "1em" }}>
                <label style={{ marginBottom: "0.5em" }}>Current user: {accounts[selectedIndex]}</label>
            </div>
            
            <Link to="/login" 
                style={{ 
                    display: "inline-block", 
                    marginTop: "1em", 
                    padding: "0.6em", 
                    borderRadius: "0.75em", 
                    fontSize: "1em", 
                    cursor: "pointer", 
                    textDecoration: "none", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    textAlign: "center"
                }}
            >
                Log in to another account
            </Link>
        </>
    );
}
