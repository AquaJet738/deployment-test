import { toHtmlElement } from "./toHtmlElement.mjs";

console.log("Hello!");

/*
const navbarElement = toHtmlElement(`<div class="navbar">
        <h1 id="name">Steven Wong</h1>
        <p><a id="link" href="index.html">Home</a></p>
        <p><a id="link" href="projects.html">Projects</a></p>
        <p><a id="link" href="https://www.linkedin.com/in/steven-wong-87091724b/">Linkedin</a></p>
    </div>`);
*/

/*
export function createElements() {
    const pElement = document.createElement("p");
    const navbarElement = document.createElement("navbar");
    const pageElement = document.createElement("page");
}*/

window.addEventListener('load', function () {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('a');
  
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
  