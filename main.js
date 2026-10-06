const themeToggleBtn = document.querySelector('#theme-toggle');
const githubContainer = document.querySelector('#github-card-container');

const githubUsername = 'Nandi288';

function applyTheme(isDark){
    document.body.classList.toggle('dark-mode', isDark);

    if(themeToggleBtn){
        themeToggleBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
}

function toggleTheme(){
    const isCurrentDark = document.body.classList.contains ('dark-mode');
    const shouldBeDark = !isCurrentDark;

    applyTheme(shouldBeDark);
    localStorage.setItem('portfolio-theme' , shouldBeDark ? 'dark' : 'light');
}

function initTheme(){
    const savedTheme = localStorage.getItem('portfolio-theme');
    const isDark = savedTheme === 'dark';

    applyTheme(isDark);

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click' , toggleTheme);
    }

}
function displayStatus (message , isError=false){
    githubContainer.innerHTML = `<p class="api-status ${isError? 'error' : ''}">${message}</p>
    `;
}

function renderProfile(user) {
    githubContainer.innerHTML = `
        <div class="github-profile-content">
            <img 
                src="${user.avatar_url}" 
                alt="GitHub avatar of ${user.login}" 
                class="github-avatar"
            />
            <div class="github-details">
                <h3>${user.name || user.login}</h3>
                <p>${user.bio || 'Software developer building modern web applications.'}</p>
                <span class="repo-badge">Public Repositories: ${user.public_repos}</span>
            </div>
        </div>
    `;
}

async function fetchGithubData() {
   
    displayStatus('Loading GitHub profile data...');

    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);

        if (!response.ok) {
            throw new Error(`Failed to load data (HTTP ${response.status})`);
        }

        const data = await response.json();

      
        renderProfile(data);

    } catch (error) {
        
        displayStatus('Unable to load GitHub activity right now. Please check your connection.', true);
    }
}

function init() {
    initTheme();
    fetchGithubData();
}

init();



