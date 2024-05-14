document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
});

function fetchBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'index.html';
        return;
    }

    fetch('http://localhost:3001/api/bookings', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(bookings => {
        displayBookings(bookings);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayBookings(bookings) {
    const bookingsList = document.getElementById('bookings');
    bookings.forEach(booking => {
        const li = document.createElement('li');
        li.textContent = `${booking.name} - ${booking.date} - ${booking.time} - ${booking.numberOfPeople} personer`;
        bookingsList.appendChild(li);
    });
}
