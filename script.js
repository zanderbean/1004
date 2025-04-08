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


// Create an array to store passwords
const passwordDatabase = [];

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

    // clear inputs after submission
    document.getElementById('Application').value = '';
    document.getElementById('Usernamein').value = '';
    document.getElementById('Passwordin').value = '';

    alert('Password saved successfully!');
    
}

function displaySavedApplications() {
    const appList = document.getElementById('appList');
    appList.innerHTML = ''; // Clear current list

    // check if there are any saved applicaitons
    passwordDatabase.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${entry.application}`;
        appList.appendChild(li);
    });
}