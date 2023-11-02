document.getElementById('searchBtn').addEventListener('click', searchUser);

function searchUser() {
    const username = document.getElementById('searchInput').value;
    if (!username) return;

    fetchUserProfile(username)
        .then(user => {
            renderUserProfile(user);
            return fetchUserRepos(username);
        })
        .then(repos => {
            renderUserRepos(repos);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function fetchUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`)
        .then(res => res.json());
}

function fetchUserRepos(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
        .then(res => res.json());
}

function renderUserProfile(user) {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = `
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}" width="100">
        <p>${user.bio || ''}</p>
    `;
    userProfile.classList.remove('hidden');
}

function renderUserRepos(repos) {
    const userRepos = document.getElementById('userRepos');
    userRepos.innerHTML = '<h3>Repositories:</h3>';
    repos.forEach(repo => {
        userRepos.innerHTML += `
            <div class="repo-item">
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                <p>Stars: ${repo.stargazers_count}</p>
            </div>
        `;
    });
    userRepos.classList.remove('hidden');
}