if (!document.getElementById('css'))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = 'css';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://scorchchamp.github.io/style.css';
    link.media = 'all';
    head.appendChild(link);
}

const headerElement = document.createElement("div");
const footerElement = document.createElement("div");
const h1Element = document.createElement("h1");
const firstChild = document.body.firstChild;
document.body.insertBefore(headerElement, firstChild);
document.body.insertBefore(h1Element, firstChild);

const splitted = document.location.href.split("/");
let repoName = splitted[splitted.length - 1]
const homePage = document.location.origin
let username = splitted[splitted.length - 2];

capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

document.title = repoName.replaceAll("-", " ").replaceAll("_", " ");
h1Element.textContent = capitalizeFirstLetter(document.title);

headerElement.classList.add("header");
headerElement.innerHTML = `
    <a href="${homePage}">
        <div class="header-title" id="header-description">${capitalizeFirstLetter(username)}</div>
    </a>
`
footerElement.classList.add("footer");
footerElement.innerHTML = `
    <div class="footer" id="footer">
        <div class="footer-group">
            <div class="footer-header">Information</div>
            <div class="information">This page is part of the 365 day challenge by Scorchchamp.</div>
            <div class="information">Check out more at <a href="${homePage}">${homePage}</a></div>
        </div>
        <div class="footer-group">
            <div class="footer-header">About ScorchChamp</div>
            <div class="information">Scorch is a fanatic programmer who wants to program 24/7.</div>
            <div class="information">He decided to challenge himself to a 365 application challenge to see how consistent and creative he is</div>
        </div>
        <div class="copyright">&#169; ${capitalizeFirstLetter(username)} - 2023 All rights reserved</div>
    </div>
`

fetch(`https://api.github.com/repos/${username}/${repoName}`)
.then((result) => result.json())
.then((data) => {
    const h2Element = document.createElement("h2");
    h2Element.classList.add("undertitle");
    h2Element.textContent = data.description;
    document.body.insertBefore(h2Element, firstChild);
});


window.onload = function runCode() {
    document.body.append(footerElement);
}