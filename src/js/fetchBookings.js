document.addEventListener('DOMContentLoaded', function() {
    fetchBookings();
});

function fetchBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch('http://localhost:3001/api/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch bookings. Status: ${response.status}`);
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
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) {
        console.error('Element with id "bookingsList" not found');
        return;
    }
    bookingsList.innerHTML = ''; // Clear existing bookings

    bookings.forEach(booking => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${booking.name} - ${booking.date.split('T')[0]} - ${booking.time} - ${booking.numberOfPeople} personer
            <span class="material-icons edit-booking-icon" data-bookingid="${booking._id}">refresh</span>
            <span class="material-icons delete-booking-icon" data-bookingid="${booking._id}">delete</span>
        `;
        bookingsList.appendChild(li);
    });

    attachBookingEventListeners();
}

function attachBookingEventListeners() {
    const deleteIcons = document.querySelectorAll('.delete-booking-icon');
    const editIcons = document.querySelectorAll('.edit-booking-icon');
    if (deleteIcons.length === 0 || editIcons.length === 0) {
        console.error('No delete or edit icons found');
        return;
    }
    
    deleteIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-bookingid');
            deleteBooking(bookingId);
        });
    });

    editIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-bookingid');
            editBooking(bookingId);
        });
    });
}

function deleteBooking(id) {
    console.log(`Delete booking ID: ${id}`);

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
        fetchBookings(); // Refresh bookings list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function editBooking(id) {
    console.log(`Editing booking ID: ${id}`);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`http://localhost:3001/api/bookings/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to fetch booking. Status: ' + response.status);
        return response.json();
    })
    .then(booking => {
        document.getElementById('bookingId').value = booking._id;
        document.getElementById('name').value = booking.name;
        document.getElementById('phone').value = booking.phone;
        document.getElementById('email').value = booking.email;
        document.getElementById('numberOfPeople').value = booking.numberOfPeople;
        document.getElementById('date').value = booking.date.split('T')[0];
        document.getElementById('time').value = booking.time;
        document.getElementById('updateButton').style.display = 'block';
        document.getElementById('bookingForm').querySelector('button[type="submit"]').style.display = 'none';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.getElementById('updateButton').addEventListener('click', function() {
    updateBooking();
});

function updateBooking() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
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
        if (!response.ok) throw new Error('Failed to update booking. Status: ' + response.status);
        return response.json();
    })
    .then(data => {
        console.log('Booking updated:', data);
        fetchBookings(); // Refresh bookings list
        clearBookingForm();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function clearBookingForm() {
    document.getElementById('bookingId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('numberOfPeople').value = '1';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
    document.getElementById('updateButton').style.display = 'none';
    document.getElementById('bookingForm').querySelector('button[type="submit"]').style.display = 'block';
}
