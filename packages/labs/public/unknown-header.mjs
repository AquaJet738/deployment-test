import { attachShadow } from "./utils.mjs";

console.log("unknown-header is running");

const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
    <style>
        .name {
            font-family: "Playwrite AU SA";
            color: lightgray;
            margin-left: 1em;
        }

        .name {
            font-family: "Playwrite AU SA";
            color: var(--color-text);
            margin-left: 1em;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2em;
            background-color: var(--color-background-header);
            position: relative;
            z-index: 1;
        }

        .links {
            display: none;
            flex-direction: column;
            gap: 1em;
            background-color: rgba(17, 180, 25, 0.8);
            position: absolute;
            top: 100%;
            right: 0;
            padding: 0.75em;
        }

        .links a {
            color: lightgray;
        }

        .links a {
            color: whitesmoke;
        }

        .menubtn {
            font-size: 1.25em;
            cursor: pointer;
        }

        @media (min-width: 601px) {
            .menubtn {
                display: none;
            }

            .links {
                display: flex !important;
                flex-direction: row;
                gap: 1em;
                position: static;
                background: none;
                padding: 0.2em;
            }
        }
    </style>

    <header class="header">
        <h1 class="name">Steven Wong</h1>
        <nav class="links">
            <p><a id="link" href="index.html">Home</a></p>
            <p><a id="link" href="projects.html">Projects</a></p>
            <p><a id="link" href="https://www.linkedin.com/in/steven-wong-87091724b/">Linkedin</a></p>
        </nav>

        <label>
            <input type="checkbox" autocomplete="off" id="lightModeToggle"/>
            Light Mode
        </label>

        <button class="menubtn">Menu</button>
    </header>
`;

class unknownHeader extends HTMLElement {
    constructor() {
        super();
        console.log("Constructor running");
    }

    connectedCallback() {
        console.log("Shadow running");
        const shadowRoot = attachShadow(this, TEMPLATE);

        const menuButton = shadowRoot.querySelector(".menubtn");
        const navLinks = shadowRoot.querySelector(".links");
        const header = shadowRoot.querySelector(".header");
        const lightModeToggle = shadowRoot.querySelector("#lightModeToggle");

        const lightModeEnabled = localStorage.getItem("#lightModeToggle") === "true";
        lightModeToggle.checked = lightModeEnabled;
        if (lightModeEnabled) {
            document.body.classList.add("light-mode");
        }

        lightModeToggle.addEventListener("change", () => {
            console.log("Light mode toggled:", lightModeToggle.checked);
            if (lightModeToggle.checked) {
                document.body.classList.add("light-mode");
            } else {
                document.body.classList.remove("light-mode");
            }

            localStorage.setItem("#lightModeToggle", lightModeToggle.checked);
        });

        menuButton.addEventListener("click", () => {
            console.log("button clicked");
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        });

        /*

        menuButton?.addEventListener("click", () => {
            console.log("button clicked");
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
        });

        $(document).on("click", function(event) {
            if (!$(event.target).closest(".menubtn").length) {
                navLinks.style.display = "none";
            }
        });

        
        document.addEventListener("click", (event) => {
            console.log("button clicked");

            if (!header.contains(event.target) && navLinks.style.display === "flex") {
                navLinks.style.display = "none";
            }
        });
        */
    }
}

customElements.define("unknown-header", unknownHeader);
