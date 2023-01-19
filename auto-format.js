const author = "ScorchChamp";
const splitted = document.location.href.split("/");
const homePage = document.location.origin
capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function getRepos(callback) {
    localStorage.getItem('repos') !== null ? callback(JSON.parse(localStorage.getItem('repos'))) :
        fetch(`https://api.github.com/users/${author}/repos?per_page=100`)
            .then(data => data.json())
            .then(repos => {
                console.log('CALLING GITHUB');
                localStorage.setItem('repos', JSON.stringify(repos));
                callback(repos)
            })
}

window.addEventListener("load", function () {
    document.getElementsByTagName('body')[0].innerHTML = `<div class='app-container' id='app-container'>${document.getElementsByTagName('body')[0].innerHTML}</div>`
    const appContainer = document.getElementById('app-container');
    const firstChild = appContainer.firstChild;
    const headerElement = document.createElement("div");
    const footerElement = document.createElement("div");
    const h1Element = document.createElement("h1");

    document.getElementsByTagName('html')[0].setAttribute('lang', 'en');

    let repoName = splitted[splitted.length - 2];
    let username = splitted[splitted.length - 3].split(".")[0];
    username === '' ? username = repoName.split('.')[0] : '';


    document.title = repoName.replaceAll("-", " ").replaceAll("_", " ");
    h1Element.textContent = capitalizeFirstLetter(document.title);

    headerElement.classList.add("header");
    headerElement.innerHTML = `
        <a href="${homePage}" aria-label="Go back to Scorchchamp's homepage!">
            <div class="header-title" id="header-description">${capitalizeFirstLetter(username)}</div>
        </a>
    `
    footerElement.classList.add("footer");
    footerElement.innerHTML = `
        <div class="footer-group">
            <div class="footer-header">Information</div>
            <div class="information">This page is part of the 365 day challenge by Scorchchamp.</div>
            <div class="information">Check out more at <a href="${homePage}" class="url">${homePage}</a></div>
        </div>
        <div class="footer-group">
            <div class="footer-header">About ScorchChamp</div>
            <div class="information">Scorch is a fanatic programmer who wants to program 24/7.</div>
            <div class="information">He decided to challenge himself to a 365 application challenge to see how consistent and creative he is</div>
        </div>
        <div class="footer-group">
        <div class="footer-header">About this website</div>
            <div class="information"><a href="https://scorchchamp.github.io/sitemap.txt" class="url">Check out the sitemap!</a>
        </div>
        <div class="copyright">&#169; ${capitalizeFirstLetter(username)} - 2023 All rights reserved</div>
    `

    document.body.insertBefore(headerElement, document.body.firstChild);
    appContainer.insertBefore(h1Element, firstChild);
    document.body.append(footerElement);

})
getRepos(function (data) {
    data.forEach(repo => {
        if (repo.name.toLowerCase() === repoName.toLowerCase()) {
            const h2Element = document.createElement("h2");
            h2Element.classList.add("undertitle");
            h2Element.textContent = repo.description;
            appContainer.insertBefore(h2Element, firstChild);

            const metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            metaDescription.setAttribute('content', repo.description);
            document.head.appendChild(metaDescription);
        }
    })
})