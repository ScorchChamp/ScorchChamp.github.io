const author = "ScorchChamp";
const splitted = document.location.href.split("/");
const homePage = document.location.origin
capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

function getRepos(callback) {
    if (localStorage.getItem('repos') !== null) {
        callback(JSON.parse(localStorage.getItem('repos')))
    } else {
        fetch(`https://api.github.com/users/${author}/repos?per_page=100`)
            .then(data => data.json())
            .then(repos => {
                console.log('CALLING GITHUB');
                localStorage.setItem('repos', JSON.stringify(repos));
                callback(repos)
            })
    }
}


window.addEventListener("load", function () {
    document.getElementsByTagName('body')[0].innerHTML = `
        <div class='app-container' id='app-container'>
            ${document.getElementsByTagName('body')[0].innerHTML}
        </div>
    `
    const appContainer = document.getElementById('app-container');
    const firstChild = appContainer.firstChild;
    const headerElement = document.createElement("div");
    const footerElement = document.createElement("div");
    const h1Element = document.createElement("h1");
    const adElement = document.createElement('ins');
    const adScript = document.createElement('script');
    const metaView = document.createElement('meta');

    // if (!document.getElementById('css')) {
    //     var head = document.getElementsByTagName('head')[0];
    //     var link = document.createElement('link');
    //     link.id = 'css';
    //     link.rel = 'stylesheet';
    //     link.type = 'text/css';
    //     link.href = 'https://scorchchamp.github.io/style.css';
    //     link.media = 'all';
    //     head.appendChild(link);
    // }

    document.getElementsByTagName('html')[0].setAttribute('lang', 'en')
    document.body.insertBefore(headerElement, document.body.firstChild);
    appContainer.insertBefore(h1Element, firstChild);

    let repoName = splitted[splitted.length - 2]
    let username = splitted[splitted.length - 3].split(".")[0];
    if (username === '') {
        username = repoName.split('.')[0]
    }


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

    getRepos(function (data) {
        const h2Element = document.createElement("h2");
        h2Element.classList.add("undertitle");
        h2Element.textContent = data.description;
        appContainer.insertBefore(h2Element, firstChild);

        const metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        metaDescription.setAttribute('content', data.description);
        document.head.appendChild(metaDescription);
    })


    adElement.setAttribute('class', 'adsbygoogle');
    adElement.setAttribute('style', 'display:block');
    adElement.setAttribute('data-ad-client', 'ca-pub-5779624385801311');
    adElement.setAttribute('data-ad-slot', '3362420111');
    adElement.setAttribute('data-ad-format', 'auto');
    adElement.setAttribute('data-full-width-responsive', 'true');

    adScript.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5779624385801311');
    adScript.setAttribute('crossorigin', 'anonymous');
    adScript.toggleAttribute('async');
    document.head.appendChild(adScript);

    appContainer.insertBefore(adElement, firstChild);

    metaView.setAttribute('name', 'viewport');
    metaView.setAttribute('content', 'width=device-width, initial-scale=1');
    document.head.appendChild(metaView);

    (adsbygoogle = window.adsbygoogle || []).push({});

    document.body.append(footerElement);
})
