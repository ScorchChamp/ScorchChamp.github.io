const author = "ScorchChamp";

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

function parseTopics(topics) {
    return topics.map(topic => `<div class="topic">${topic}</div>`).join('');
}

function parseRepo(repo) {
    return `
            <a href="https://${author}.github.io/${repo.name}" target="_blank">
                <div class="repo">
                    <h3 class="repo-name">${repo.name} - ${parseTime(repo.updated_at)}</h3>
                </div>
            </a>
    `;
}


function displayPages() {
    getRepos(function (pages) {
        const container = document.querySelector('.container');
        container.innerHTML = pages.filter(repo => repo.has_pages)
            .map(repo => parseRepo(repo))
            .join('');
    });
}

function parseTime(timeString) {
    const time = new Date(timeString);
    const currentTime = new Date();
    const diff = currentTime - time;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return seconds < 60 ? `${seconds} second${(seconds > 1 ? "s" : "")} ago` :
           minutes < 60 ? `${minutes} minute${(minutes > 1 ? "s" : "")} ago` :
           hours < 24   ? `${hours} hour${(hours > 1 ? "s" : "")} ago` :
           time.toDateString();

}

displayPages();
