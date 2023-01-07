const author = "ScorchChamp";

async function getPages() {
    const reposResponse = await fetch(`https://api.github.com/users/${author}/repos`);
    const repos = await reposResponse.json();
    return repos.filter(repo => repo.has_pages).map(repo => parseRepo(repo));
}

function parseTopics(topics) {
    return topics.map(topic => `<div class="topic">${topic}</div>`).join('');
}

function parseRepo(repo) {
    return `
        <div class="repo-container">
            <a href="https://${author}.github.io/${repo.name}" target="_blank">
                <div class="repo">
                    <h2 class="repo-name">${repo.name}</h2>
                    <div class="topics">${parseTopics(repo.topics)}</div>
                    <p>${repo.description}</p>
                    <h5 class="last-updated">Last update <span class="last-updated-time">${parseTime(repo.updated_at)}</span></h5>
                </div>
            </a>
            <a href="${repo.html_url}" target="_blank">
                <div class="repo-source">
                    <p>View Sourcecode</p>
                </div>
            </a>
        </div>
    `;
}


async function displayPages() {
    const pages = await getPages();
    const container = document.querySelector('.container');
    container.innerHTML = pages.join('');
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
            hours < 24 ? `${hours} hour${(hours > 1 ? "s" : "")} ago` :
                time.toDateString();

}

displayPages();
