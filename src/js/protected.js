document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    fetchProtectedData();

    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', logout);
    }
});

function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html'; // Omdirigera till inloggningssidan om ingen token finns
    }
}

function fetchProtectedData() {
    const token = localStorage.getItem('token');
    fetch('http://localhost:3001/api/protected', {
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
                window.location.href = '/src/html/login.html'; // Omdirigera till inloggningssidan
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

function logout() {
    localStorage.removeItem('token'); // Rensa token
    const feedback = document.getElementById('feedback');
    if (feedback) {
        feedback.textContent = 'Du har loggats ut.';
    }
    setTimeout(() => {
        window.location.href = '/src/html/login.html'; // Omdirigera till inloggningssidan
    }, 1000); // Vänta en sekund innan omdirigering
}
