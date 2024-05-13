document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const formFeedback = document.getElementById('formFeedback');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            loginUser(username, password);        
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            registerUser(username, email, password);
        });
    }
});
// Funktion för att logga in
function loginUser(username, password) {
    fetch(`http://localhost:3001/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Inloggningen misslyckades. Status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'list.html';
        } else {
            throw new Error('Inget token mottaget');
        }
    })
    .catch(error => {
        console.error('Fel vid inloggning:', error.message);
        const Feedback = document.getElementById('Feedback');
        Feedback.textContent = 'Fel användarnamn/lösenord! Prova igen!';
    });
}

// Funktion för att registrera ny användare
function registerUser(username, email, password) {
    fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => response.json())
    .then(data => {
        const Feedback = document.getElementById('Feedback');
        Feedback.textContent = 'Registreringen lyckades! Vänligen logga in.';
        setTimeout(() => {
            window.location.href = 'index.html'; // Omdirigera till inloggningssidan
        }, 1000); // Vänta en sekund innan omdirigering
    })
    .catch(error => {
        console.error('Fel vid registrering:', error.message);
        const Feedback = document.getElementById('Feedback');
        Feedback.textContent = 'Fel vid registrering: ' + error.message;
    });
}
