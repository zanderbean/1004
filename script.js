

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

    //  object to hold the data
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


// logic for showing list of saved applications
function displaySavedApplications() {
    const appList = document.getElementById('appList');
    appList.innerHTML = ''; // Clear current list

    passwordDatabase = JSON.parse(localStorage.getItem('passwords')) || [];

    // check if there are any saved applicaitons
    passwordDatabase.forEach((entry, index) => {
        const appCard = document.createElement('div');
        appCard.className = 'app-card';
        appCard.textContent = `${entry.application}`;
        appList.appendChild(appCard);
    });
}