document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createBooking();
    });
});

function createBooking() {
    const name = sanitizeInput(document.getElementById('name').value);
    const phone = sanitizeInput(document.getElementById('phone').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const numberOfPeople = sanitizeInput(document.getElementById('numberOfPeople').value);
    const date = sanitizeInput(document.getElementById('date').value);
    const time = sanitizeInput(document.getElementById('time').value);

    fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}` // Remove this line
        },
        body: JSON.stringify({ name, phone, email, numberOfPeople, date, time })
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to create booking. Status: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Booking created:', data);
        showSnackbar('Bokning skapad!');
        clearForm();
    })
    .catch(error => {
        console.error('Error:', error);
        showSnackbar('Något gick fel. Försök igen.');
    });
}

function updateBooking() {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

    const id = document.getElementById('bookingId').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const numberOfPeople = document.getElementById('numberOfPeople').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, phone, email, numberOfPeople, date, time })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update booking. Status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log('Booking updated:', data);
        if (document.getElementById('bookingsList')) {
            fetchBookings(); // Refresh bookings list
        }
        clearForm();
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('bookingForm').querySelector('button[type="submit"]').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearForm() {
    const bookingId = document.getElementById('bookingId');
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    const numberOfPeople = document.getElementById('numberOfPeople');
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    if (bookingId) bookingId.value = '';
    if (name) name.value = '';
    if (phone) phone.value = '';
    if (email) email.value = '';
    if (numberOfPeople) numberOfPeople.value = '1';
    if (date) date.value = '';
    if (time) time.value = '';
}

function deleteBooking(id) {
    console.log(`Delete booking ID: ${id}`); // Debug utskrift

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete booking. Status: ' + response.status);
        if (document.getElementById('bookingsList')) {
            fetchBookings(); // Refresh bookings list
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
