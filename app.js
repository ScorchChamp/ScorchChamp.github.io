const author = "ScorchChamp";

async function getPages() {
    const reposResponse = await fetch(`https://api.github.com/users/${author}/repos`);
    // const repos = await reposResponse.json();
    const repos = [];
    if (repos.length === 0) {
        return [parseRepo({"name": "ScorchChamp", "description": "View ScorchChamp's repositories, statistics, and more!", "html_url": "https://github.com/ScorchChamp"})];
    }
    return repos.filter(repo => repo.has_pages && repo.topics.includes("tool")).map(repo => parseRepo(repo));
}

function parseRepo(repo) {
    const url = `https://${author}.github.io/${repo.name}`;
    return `
        <div class="repo-container">
            <a href="${url}" target="_blank">
                <div class="repo">
                    <h2>${repo.name}</h2>
                    <p>${repo.description}</p>
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

displayPages();
