const metaView = document.createElement('meta');
metaView.setAttribute('name', 'viewport');
metaView.setAttribute('content', 'width=device-width, initial-scale=1.0');
document.head.appendChild(metaView);

const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'utf-8');
document.head.appendChild(metaCharset);

const fontLinkOrigin = document.createElement('link');
fontLinkOrigin.id = 'css';
fontLinkOrigin.rel = 'preload';
fontLinkOrigin.href = `https://fonts.gstatic.com/s/firacode/v21/uU9eCBsR6Z2vfE9aq3bL0fxyUs4tcw4W_D1sJVD7MOzlojwUKQ.woff`;
fontLinkOrigin.as = 'font';
fontLinkOrigin.type = 'font/woff2';
fontLinkOrigin.toggleAttribute('crossorigin');
document.head.appendChild(fontLinkOrigin);

const styleLink = document.createElement('link');
styleLink.id = 'css';
styleLink.rel = 'stylesheet';
styleLink.type = 'text/css';
styleLink.href = `${document.location.origin}/style.css`;
styleLink.media = 'all';
document.head.appendChild(styleLink);

const adScript = document.createElement('script');
adScript.setAttribute('src', 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5779624385801311');
adScript.setAttribute('crossorigin', 'anonymous');
adScript.toggleAttribute('async');
document.head.appendChild(adScript);

(adsbygoogle = window.adsbygoogle || []).push({});


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