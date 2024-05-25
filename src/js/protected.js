/*
* Denna fil hanterar användarautentisering och skyddad data. 
* Vid inladdning kontrollerar den om användaren är autentiserad och hämtar skyddad data.
* Innehåller funktioner för att kontrollera autentisering, hämta skyddad data, sanera data och logga ut användaren.
*/

document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    fetchProtectedData();

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', logout);
    }
});

// Funktion för att kontrollera om användaren är autentiserad
function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html'; // Omdirigera till inloggningssidan om ingen token finns
    }
}

// Funktion för att hämta skyddad data från servern
function fetchProtectedData() {
    const token = localStorage.getItem('token');
    fetch('https://backend-baserad-webbutveckling-moment-5.onrender.com/api/protected', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 401) {
                // Token är ogiltig eller har gått ut
                alert('Sessionen har gått ut. Vänligen logga in igen.');
                localStorage.removeItem('token'); // Rensa token
                window.location.href = 'login.html'; // Omdirigera till inloggningssidan
            }
            throw new Error('Kunde inte hämta skyddad data.');
        }
        return response.json();
    })
    .then(data => {
        const sanitizedData = sanitizeData(data);
    })
    .catch(error => {
        console.error('Error:', error);
        const feedback = document.getElementById('feedback');
        if (feedback) {
            feedback.textContent = 'Ett fel inträffade vid hämtning av data. Vänligen försök igen.';
        }
    });
}

// Funktion för att sanera användardata
function sanitizeData(data) {
    if (!Array.isArray(data)) {
        data = [data]; 
    }
    return data.map(item => ({
        ...item,
        username: item.username ? item.username.replace(/(<([^>]+)>)/ig, '') : '',  // Sanera användarnamnet
        password: item.password ? item.password.replace(/(<([^>]+)>)/ig, '') : ''
    }));
}

// Funktion för att logga ut användaren
function logout() {
    localStorage.removeItem('token'); // Rensa token
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = 'Du har loggats ut.';
    }
    setTimeout(() => {
        window.location.href = 'login.html'; // Omdirigera till inloggningssidan
    }, 1000); // Vänta en sekund innan omdirigering
}
