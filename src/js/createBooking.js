document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        createBooking();
    });
});

function createBooking() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
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
        if (!response.ok) throw new Error('Failed to create booking. Status: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Booking created:', data);
        fetchBookings(); // Refresh bookings list
        clearForm();
    })
    .catch(error => {
        console.error('Error:', error);
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
        fetchBookings(); // Refresh bookings list
        clearForm();
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('bookingForm').querySelector('button[type="submit"]').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearForm() {
    document.getElementById('bookingId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('numberOfPeople').value = '1';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
}


function deleteBooking(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }

    fetch(`http://localhost:3001/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete booking. Status: ' + response.status);
        }
        fetchBookings(); // Refresh bookings list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
