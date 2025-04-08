

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
let passwordDatabase = JSON.parse(localStorage.getItem('userdata')) || [];

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

    localStorage.setItem('userdata', JSON.stringify(passwordDatabase));

    // clear inputs after submission
    document.getElementById('Application').value = '';
    document.getElementById('Usernamein').value = '';
    document.getElementById('Passwordin').value = '';

    alert('Password saved successfully!');
    
}

// Clear localStorage when button pressed on password manager page
function clearAllPasswords() {
    localStorage.removeItem('userdata'); 
    passwordDatabase = []; 
    displaySavedApplications(); // Update UI
    document.getElementById('searchResult').innerHTML = ''; 
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

    passwordDatabase = JSON.parse(localStorage.getItem('userdata')) || [];

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
    const searchInput = document.getElementById('searchApp').value.trim();
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = ''; // clears previous result


    const passwordDatabase = JSON.parse(localStorage.getItem('userdata')) || [];

    const match = passwordDatabase.find(entry => entry.application === searchInput);

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

// Export the passwords to a flat file (.txt)
function exportPasswords() {
    var jsonData = JSON.stringify(passwordDatabase);
    var fileBlob = new Blob([jsonData], { type: 'text/plain' });
    var fileUrl = URL.createObjectURL(fileBlob);

    var downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'passwords.txt';
    downloadLink.click();

    URL.revokeObjectURL(fileUrl); // free memory
}

// Import passwords from a flat file
function importPasswords(event) {
    var selectedFile = event.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function(e) {
        try {
            var loadedData = JSON.parse(e.target.result);
            passwordDatabase = loadedData;
            localStorage.setItem('userdata', JSON.stringify(passwordDatabase));
            displaySavedApplications();
            alert("Passwords imported!");
        } catch (err) {
            alert("Invalid file format.");
        }
    };

    if (selectedFile) {
        fileReader.readAsText(selectedFile);
    }
}