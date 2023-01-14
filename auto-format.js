if (!document.getElementById('css'))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = 'css';
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    // link.href = 'https://scorchchamp.github.io/style.css';
    link.href = '/style.css';
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
let repoName = splitted[splitted.length - 2]
const homePage = document.location.origin
let username = splitted[splitted.length - 3].split(".")[0];
if (username === '') {
    username = repoName.split('.')[0]
}

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

    const metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', data.description);
    document.head.appendChild(metaDescription);
});

window.addEventListener("load", function() {
    document.body.append(footerElement);
})
     
const adElement = document.createElement('ins');
adElement.setAttribute('class', 'adsbygoogle');
adElement.setAttribute('style', 'display:block');
adElement.setAttribute('data-ad-client', 'ca-pub-5779624385801311');
adElement.setAttribute('data-ad-slot', '3362420111');
adElement.setAttribute('data-ad-format', 'auto');
adElement.setAttribute('data-full-width-responsive', 'true');

const adScript = document.createElement('script');
adScript.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5779624385801311');
adScript.setAttribute('crossorigin', 'anonymous');
adScript.toggleAttribute('async');
document.head.appendChild(adScript);

document.body.insertBefore(adElement, firstChild);

const metaView = document.createElement('meta');
metaView.setAttribute('name', 'viewport');
metaView.setAttribute('content', 'width=device-width, initial-scale=1');
document.head.appendChild(metaView);

(adsbygoogle = window.adsbygoogle || []).push({});
