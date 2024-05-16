document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
    
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createBooking();
    });
});

function createBooking() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const numberOfPeople = document.getElementById('numberOfPeople').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, email, numberOfPeople, date, time })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create booking. Status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking created:', data);
        fetchBookings(); // Refresh bookings list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
