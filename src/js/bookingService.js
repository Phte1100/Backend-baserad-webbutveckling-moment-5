// bookingService.js

// Funktion för att visa snackbar-meddelande
export function showSnackbar(message) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = 'show';
    setTimeout(() => {
        snackbar.className = snackbar.className.replace('show', '');
    }, 3000);
}

// Hämta bokningar från servern
export function fetchBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch('https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings', {
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

// Funktion för att skapa en ny bokning
export function createBooking() {
    const name = sanitizeInput(document.getElementById('name').value);
    const phone = sanitizeInput(document.getElementById('phone').value);
    const email = sanitizeInput(document.getElementById('email').value);
    const numberOfPeople = sanitizeInput(document.getElementById('numberOfPeople').value);
    const date = sanitizeInput(document.getElementById('date').value);
    const time = sanitizeInput(document.getElementById('time').value);

    fetch('https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        fetchBookings(); // Uppdatera bokningslistan
        clearForm();
    })
    .catch(error => {
        console.error('Error:', error);
        showSnackbar('Något gick fel. Försök igen.');
    });
}

// Funktion för att uppdatera en bokning
export function updateBooking() {
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

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
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
        fetchBookings(); // Uppdatera bokningslistan
        clearForm();
        showSnackbar('Bokning uppdaterad!');
        document.getElementById('updateButton').style.display = 'none';
        document.getElementById('bookingForm').querySelector('button[type="submit"]').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Funktion för att rensa bokningsformuläret
export function clearForm() {
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

// Funktion för att radera en bokning
export function deleteBooking(id) {
    console.log(`Delete booking ID: ${id}`); // Debug utskrift

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Failed to delete booking. Status: ' + response.status);
        fetchBookings(); // Uppdatera bokningslistan
        showSnackbar('Bokning raderad!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Funktion för att visa bokningar på sidan
export function displayBookings(bookings) {
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) {
        console.warn('Element with id "bookingsList" not found');
        return;
    }
    bookingsList.innerHTML = ''; // Clear existing bookings

    bookings.forEach(booking => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${booking.name} - ${booking.date.split('T')[0]} - ${booking.time} - ${booking.numberOfPeople} personer
            <span class="material-icons edit-booking-icon" data-bookingid="${booking._id}">refresh</span>
            <span class="material-icons delete-booking-icon" data-bookingid="${booking._id}">delete</span>
        <hr>
            `;
        bookingsList.appendChild(li);
    });

    attachBookingEventListeners();
}

// Funktion för att lägga till händelselyssnare på redigerings- och raderingsikoner
export function attachBookingEventListeners() {
    const deleteIcons = document.querySelectorAll('.delete-booking-icon');
    const editIcons = document.querySelectorAll('.edit-booking-icon');
    if (deleteIcons.length === 0 || editIcons.length === 0) {
        console.warn('No delete or edit icons found');
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

// Fyll formuläret med bokningsdata för redigering
export function editBooking(id) {
    console.log(`Editing booking ID: ${id}`);

    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login.');
        window.location.href = '/src/html/login.html';
        return;
    }

    fetch(`https://backend-baserad-webbutveckling-moment-5.onrender.com/api/bookings/${id}`, {
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

// Funktion för att sanera inmatade värden för att undvika XSS-attacker
export function sanitizeInput(input) {
    return input ? input.replace(/(<([^>]+)>)/ig, '') : '';
}
