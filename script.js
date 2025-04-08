

// page switching logic
function doSomething(contentId) {
    // Hides all other content sections
    const allContent = document.querySelectorAll('.hiddenContent');
    allContent.forEach(content => {
        content.style.display = 'none';
    });

    // Shows the selected section
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';

    if (contentId === 'Password Manager') {
        displaySavedApplications();
    }
}

//  load from local storage or initialize empty array
let passwordDatabase = JSON.parse(localStorage.getItem('passwords')) || [];

function savePassword() {
    const app = document.getElementById('Application').value.trim();
    const username = document.getElementById('Usernamein').value.trim();
    const password = document.getElementById('Passwordin').value.trim();

    if (!app || !username || !password) {
        alert('Please fill out all fields.');
        return;
    }
    const entry = {
        application: app,
        username: username,
        password: password
        
    };

    // Store password in the array 
    passwordDatabase.push(entry);

    localStorage.setItem('passwords', JSON.stringify(passwordDatabase));

    // clear inputs after submission
    document.getElementById('Application').value = '';
    document.getElementById('Usernamein').value = '';
    document.getElementById('Passwordin').value = '';

    alert('Password saved successfully!');
    
}

// Logic for evaluating password strenght, credits to  jagathishwaran on github

function evaluateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
}

// logic for showing list of saved applications
function displaySavedApplications() {
    const appList = document.getElementById('appList');
    appList.innerHTML = ''; // Clear current list

    passwordDatabase = JSON.parse(localStorage.getItem('passwords')) || [];

    // check if there are any saved applicaitons
    passwordDatabase.forEach((entry) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';

        const strength = evaluateStrength(entry.password);

        // Add corresponding strength class
        if (strength <= 2) {
            appCard.classList.add('weak');
        } else if (strength <= 4) {
            appCard.classList.add('medium');
        } else {
            appCard.classList.add('strong');
        }

        appCard.textContent = `${entry.application}`;
        appList.appendChild(appCard);
    });
}


function searchApplication() {
    const searchInput = document.getElementById('searchApp').value.trim().toLowerCase();
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = ''; // clears previous result

    if (!searchInput) {
        searchResult.textContent = 'Please enter an application name.';
        return;
    }

    const passwordDatabase = JSON.parse(localStorage.getItem('passwords')) || [];

    const match = passwordDatabase.find(entry => entry.application.toLowerCase() === searchInput);

    if (match) {
        const resultCard = document.createElement('div');
        resultCard.className = 'app-card';
        resultCard.innerHTML = `
            <strong>Application:</strong> ${match.application} <br>
            <strong>Username:</strong> ${match.username} <br>
            <strong>Password:</strong> ${match.password}
        `;
        searchResult.appendChild(resultCard);
    } else {
        searchResult.textContent = 'No application found with that name.';
    }
}