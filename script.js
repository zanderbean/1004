function doSomething(contentId) {
    // Hides all other content sections
    const allContent = document.querySelectorAll('.hiddenContent');
    allContent.forEach(content => {
        content.style.display = 'none';
    });

    // Shows the selected section
    const selectedContent = document.getElementById(contentId);
    selectedContent.style.display = 'block';
}


// Create an array to store passwords in-memory
const passwordDatabase = [];

function savePassword() {
    const app = document.getElementById('Application').value;
    const username = document.getElementById('Usernamein').value;
    const password = document.getElementById('Passwordin').value;

    // Simple object to hold the data
    const entry = {
        application: app,
        username: username,
        password: password
    };

    // Store it in the array (can be later expanded to use localStorage or a backend)
    passwordDatabase.push(entry);

    // Optional: clear inputs after submission
    document.getElementById('Application').value = '';
    document.getElementById('Usernamein').value = '';
    document.getElementById('Passwordin').value = '';

    alert('Password saved!');

    // Optional: log to console to confirm
    console.log(passwordDatabase);
}