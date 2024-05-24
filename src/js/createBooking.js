// createBooking.js
import { createBooking, updateBooking, clearForm } from './bookingService.js';

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            createBooking();
        });
    }
    const updateButton = document.getElementById('updateButton');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            updateBooking();
        });
    }
});
