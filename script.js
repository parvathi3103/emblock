document.getElementById('searchBtn').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const profileDiv = document.getElementById('profile');
    const reposDiv = document.getElementById('repos');
    const activityChartDiv = document.getElementById('activityChart');

    
    profileDiv.innerHTML = '';
    reposDiv.innerHTML = '';
    activityChartDiv.innerHTML = '';

    
    const profileResponse = await fetch(`/api/user/${username}`);
    const profileData = await profileResponse.json();

    if (profileResponse.ok) {
        // Display profile information
        profileDiv.innerHTML = `
            <h2>${profileData.login}</h2>
            <img src="${profileData.avatar_url}" alt="${profileData.login}'s avatar" width="100">
            <p><strong>Bio:</strong> ${profileData.bio || 'No bio available'}</p>
            <p><strong>Followers:</strong> ${profileData.followers}</p>
            <p><strong>Following:</strong> ${profileData.following}</p>
            <p><strong>Public Repositories:</strong> ${profileData.public_repos}</p>
            <p><strong>Location:</strong> ${profileData.location || 'Not specified'}</p>
        `;
    } else {
        profileDiv.innerHTML = `<p>User not found. Please check the username.</p>`;
        return;
    }

    // Fetch user repositories
    const reposResponse = await fetch(`/api/user/${username}/repos`);
    const reposData = await reposResponse.json();

    if (reposResponse.ok) {
        reposData.forEach(repo => {
            reposDiv.innerHTML += `
                <div>
                    <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                    <p><strong>Description:</strong> ${repo.description || 'No description available'}</p>
                    <p><strong>Stars:</strong> ${repo.stargazers_count}</p>
                    <p><strong>Forks:</strong> ${repo.forks_count}</p>
                    <p><strong>Language:</strong> ${repo.language || 'Not specified'}</p>
                </div>
                <hr>
            `;
        });
    } else {
        reposDiv.innerHTML = `<p>No repositories found for this user.</p>`;
    }

    // Fetch user activity (placeholder)
    const activityResponse = await fetch(`/api/user/${username}/activity`);
    const activityData = await activityResponse.json();

    // Here you would normally process and display the activity data
    // For now, just show a placeholder
    activityChartDiv.innerHTML = '<p>Activity data would be visualized here.</p>';
});