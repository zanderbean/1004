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


// Create an array to store passwords
const passwordDatabase = [];

function savePassword() {
    const app = document.getElementById('Application').value;
    const username = document.getElementById('Usernamein').value;
    const password = document.getElementById('Passwordin').value;

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